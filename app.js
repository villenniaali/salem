// Laskee joukkue-, pelaaja- ja maalivahtitilastot window.TILASTOT-datasta.

(function () {
  "use strict";

  const data = window.TILASTOT;

  // Pisteet: voitto 3, jatkoaikavoitto 2, jatkoaikatappio 1, tappio 0.
  function otteluTulos(o) {
    const voitto = o.omat > o.vastustajan;
    if (o.jatkoaika) return voitto ? "JV" : "JH";
    return voitto ? "V" : "H";
  }
  const SARJAPISTEET = { V: 3, JV: 2, JH: 1, H: 0 };

  function laskeJoukkue(ottelut) {
    const t = { O: 0, V: 0, JV: 0, JH: 0, H: 0, TM: 0, PM: 0, P: 0 };
    for (const o of ottelut) {
      const r = otteluTulos(o);
      t.O++;
      t[r]++;
      t.TM += o.omat;
      t.PM += o.vastustajan;
      t.P += SARJAPISTEET[r];
    }
    return t;
  }

  function laskePelaajat(pelaajat, ottelut) {
    const rivit = new Map();
    for (const p of pelaajat) {
      rivit.set(p.numero, { ...p, O: 0, M: 0, S: 0, J: 0 });
    }
    const hae = (nro) => {
      const r = rivit.get(nro);
      if (!r) throw new Error("Tuntematon pelinumero: " + nro);
      return r;
    };
    for (const o of ottelut) {
      for (const nro of o.pelanneet) hae(nro).O++;
      for (const m of o.maalit) {
        hae(m.maali).M++;
        for (const s of m.syotot) hae(s).S++;
      }
      for (const j of o.jaahyt) hae(j.pelaaja).J += j.min;
    }
    return [...rivit.values()].filter((r) => r.pelipaikka !== "MV");
  }

  // Järjestää pistepörssin ja antaa tasapisteissä oleville saman sijan.
  function pistejarjestys(rivit) {
    const jarj = rivit
      .map((r) => ({ ...r, P: r.M + r.S }))
      .sort((a, b) => b.P - a.P || b.M - a.M || a.O - b.O || a.nimi.localeCompare(b.nimi, "fi"));
    jarj.forEach((r, i) => {
      r.sija = i > 0 && jarj[i - 1].P === r.P ? jarj[i - 1].sija : i + 1;
    });
    return jarj;
  }

  function laskeMaalivahdit(pelaajat, ottelut) {
    const rivit = new Map();
    for (const p of pelaajat.filter((p) => p.pelipaikka === "MV")) {
      rivit.set(p.numero, { ...p, O: 0, V: 0, T: 0, PM: 0, NP: 0 });
    }
    for (const o of ottelut) {
      for (const mv of o.maalivahdit) {
        const r = rivit.get(mv.pelaaja);
        if (!r) throw new Error("Maalivahtia ei löydy: " + mv.pelaaja);
        r.O++;
        r.T += mv.torjunnat;
        r.PM += mv.paastetyt;
        if (mv.paastetyt === 0) r.NP++;
      }
      // Voitto kirjataan ottelun ensimmäiselle (aloittaneelle) maalivahdille.
      if (o.omat > o.vastustajan && o.maalivahdit.length) {
        rivit.get(o.maalivahdit[0].pelaaja).V++;
      }
    }
    return [...rivit.values()]
      .filter((r) => r.O > 0)
      .map((r) => {
        const laukaukset = r.T + r.PM;
        return {
          ...r,
          torjuntaPros: laukaukset ? r.T / laukaukset : null,
          pmKa: r.O ? r.PM / r.O : null,
        };
      })
      .sort((a, b) => (b.torjuntaPros ?? -1) - (a.torjuntaPros ?? -1));
  }

  // --- Esitys ---

  const el = (tag, attrs = {}, ...lapset) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    for (const l of lapset) e.append(l);
    return e;
  };

  function taulukko(sarakkeet, rivit) {
    const thead = el("thead", {}, el("tr", {}, ...sarakkeet.map((s) =>
      el("th", { title: s.selite || s.otsikko, class: s.luku ? "luku" : "" }, s.otsikko))));
    const tbody = el("tbody", {}, ...rivit.map((r) =>
      el("tr", {}, ...sarakkeet.map((s) =>
        el("td", { class: s.luku ? "luku" : s.rivita ? "rivita" : "" }, String(s.arvo(r)))))));
    return el("div", { class: "taulukko-kehys" }, el("table", {}, thead, tbody));
  }

  const desim = (x, n = 2) => (x == null ? "–" : x.toFixed(n).replace(".", ","));
  const pros = (x) => (x == null ? "–" : desim(x * 100, 1) + " %");
  const pvm = (iso) => {
    const [v, k, p] = iso.split("-").map(Number);
    return `${p}.${k}.${v}`;
  };

  const naytaOsio = (id, nayta) => {
    for (const e of document.querySelectorAll(`[data-osio="${id}"]`)) e.hidden = !nayta;
  };

  function piirraKausi(kausi) {
    const ottelut = [...(kausi.ottelut || [])].sort((a, b) => a.pvm.localeCompare(b.pvm));
    const pelaajat = kausi.pelaajat || [];
    const nimi = (nro) => pelaajat.find((p) => p.numero === nro)?.nimi ?? "#" + nro;
    const onOttelut = ottelut.length > 0;

    document.title = `${data.joukkue} – ${kausi.nimi}`;
    for (const id of ["yhteenveto", "joukkue", "maalivahdit", "ottelut"]) naytaOsio(id, onOttelut);

    const pisteet = pistejarjestys(kausi.pelaajatilastot || laskePelaajat(pelaajat, ottelut));
    const onNumerot = pisteet.some((r) => r.numero != null);
    const onPaikat = pisteet.some((r) => r.pelipaikka);
    const perOttelu = (x, r) => (r.O ? desim(x / r.O) : "–");
    document.getElementById("pelaajat").replaceChildren(taulukko([
      { otsikko: "Sija", luku: true, arvo: (r) => r.sija + "." },
      onNumerot && { otsikko: "#", luku: true, arvo: (r) => r.numero ?? "" },
      { otsikko: "Pelaaja", arvo: (r) => r.nimi },
      onPaikat && { otsikko: "PP", selite: "Pelipaikka", arvo: (r) => r.pelipaikka ?? "" },
      { otsikko: "O", selite: "Ottelut", luku: true, arvo: (r) => r.O },
      { otsikko: "M", selite: "Maalit", luku: true, arvo: (r) => r.M },
      { otsikko: "S", selite: "Syötöt", luku: true, arvo: (r) => r.S },
      { otsikko: "P", selite: "Pisteet", luku: true, arvo: (r) => r.P },
      { otsikko: "J", selite: "Jäähyminuutit", luku: true, arvo: (r) => r.J },
      { otsikko: "M/O", selite: "Maalit per ottelu", luku: true, arvo: (r) => perOttelu(r.M, r) },
      { otsikko: "S/O", selite: "Syötöt per ottelu", luku: true, arvo: (r) => perOttelu(r.S, r) },
      { otsikko: "P/O", selite: "Pisteet per ottelu", luku: true, arvo: (r) => perOttelu(r.P, r) },
    ].filter(Boolean), pisteet));

    if (!onOttelut) return;

    const t = laskeJoukkue(ottelut);
    const kortit = [
      ["Ottelut", t.O],
      ["Voitot", t.V + t.JV],
      ["Tappiot", t.H + t.JH],
      ["Maalit", `${t.TM}–${t.PM}`],
      ["Sarjapisteet", t.P],
    ];
    document.getElementById("yhteenveto").replaceChildren(
      ...kortit.map(([o, a]) => el("div", { class: "kortti" },
        el("div", { class: "kortti-arvo" }, String(a)),
        el("div", { class: "kortti-otsikko" }, o))));

    document.getElementById("joukkue").replaceChildren(taulukko([
      { otsikko: "O", selite: "Ottelut", luku: true, arvo: (r) => r.O },
      { otsikko: "V", selite: "Voitot", luku: true, arvo: (r) => r.V },
      { otsikko: "JV", selite: "Jatkoaikavoitot", luku: true, arvo: (r) => r.JV },
      { otsikko: "JH", selite: "Jatkoaikahäviöt", luku: true, arvo: (r) => r.JH },
      { otsikko: "H", selite: "Häviöt", luku: true, arvo: (r) => r.H },
      { otsikko: "TM", selite: "Tehdyt maalit", luku: true, arvo: (r) => r.TM },
      { otsikko: "PM", selite: "Päästetyt maalit", luku: true, arvo: (r) => r.PM },
      { otsikko: "+/-", selite: "Maaliero", luku: true, arvo: (r) => (r.TM - r.PM > 0 ? "+" : "") + (r.TM - r.PM) },
      { otsikko: "P", selite: "Sarjapisteet", luku: true, arvo: (r) => r.P },
    ], [t]));

    document.getElementById("maalivahdit").replaceChildren(taulukko([
      { otsikko: "#", luku: true, arvo: (r) => r.numero },
      { otsikko: "Maalivahti", arvo: (r) => r.nimi },
      { otsikko: "O", selite: "Ottelut", luku: true, arvo: (r) => r.O },
      { otsikko: "V", selite: "Voitot", luku: true, arvo: (r) => r.V },
      { otsikko: "T", selite: "Torjunnat", luku: true, arvo: (r) => r.T },
      { otsikko: "PM", selite: "Päästetyt maalit", luku: true, arvo: (r) => r.PM },
      { otsikko: "T%", selite: "Torjuntaprosentti", luku: true, arvo: (r) => pros(r.torjuntaPros) },
      { otsikko: "PM/O", selite: "Päästetyt maalit per ottelu", luku: true, arvo: (r) => desim(r.pmKa) },
      { otsikko: "NP", selite: "Nollapelit", luku: true, arvo: (r) => r.NP },
    ], laskeMaalivahdit(pelaajat, ottelut)));

    document.getElementById("ottelut").replaceChildren(taulukko([
      { otsikko: "Pvm", arvo: (o) => pvm(o.pvm) },
      { otsikko: "Ottelu", arvo: (o) => (o.koti ? `${data.joukkue} – ${o.vastustaja}` : `${o.vastustaja} – ${data.joukkue}`) },
      { otsikko: "Tulos", arvo: (o) => (o.koti ? `${o.omat}–${o.vastustajan}` : `${o.vastustajan}–${o.omat}`) + (o.jatkoaika ? " ja" : "") },
      { otsikko: "", arvo: (o) => otteluTulos(o) },
      { otsikko: "Omat maalintekijät", rivita: true, arvo: (o) => o.maalit.map((m) => nimi(m.maali)).join(", ") || "–" },
    ], ottelut.reverse()));
  }

  function piirra() {
    document.getElementById("otsikko").textContent = data.joukkue;
    const valinta = document.getElementById("kausi");
    valinta.replaceChildren(...data.kaudet.map((k, i) => el("option", { value: i }, k.nimi)));
    valinta.disabled = data.kaudet.length < 2;
    valinta.onchange = () => naytaKausi(data.kaudet[valinta.value]);
    naytaKausi(data.kaudet[0]);
  }

  function naytaKausi(kausi) {
    document.getElementById("virhe").textContent = "";
    try {
      piirraKausi(kausi);
    } catch (e) {
      document.getElementById("virhe").textContent = "Virhe tilastodatassa: " + e.message;
      throw e;
    }
  }

  piirra();
})();
