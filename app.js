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

  // Ottelutiedoissa pelaajaan viitataan tunnisteella (id) tai pelinumerolla.
  const avain = (p) => p.id ?? p.numero;

  function laskePelaajat(pelaajat, ottelut) {
    const rivit = new Map();
    for (const p of pelaajat) {
      rivit.set(avain(p), { ...p, O: 0, M: 0, S: 0, J: 0 });
    }
    const hae = (nro) => {
      const r = rivit.get(nro);
      if (!r) throw new Error("Tuntematon pelaaja: " + nro);
      return r;
    };
    for (const o of ottelut) {
      for (const nro of o.pelanneet) hae(nro).O++;
      for (const m of o.maalit) {
        hae(m.maali).M++;
        for (const s of m.syotot) hae(s).S++;
      }
      for (const s of o.syotot || []) hae(s.pelaaja).S += s.maara;
      for (const j of o.jaahyt) hae(j.pelaaja).J += j.min;
    }
    return [...rivit.values()].filter((r) => r.pelipaikka !== "MV");
  }

  // Lisää kokonaislukuihin niiden jälkeen pelattujen otteluiden tilastot.
  // Pelaajat yhdistetään nimellä; pelaajat-listasta tulevat myös pelinumerot.
  function yhdista(pohja, lasketut) {
    const rivit = new Map(pohja.map((r) => [r.nimi, { ...r }]));
    for (const l of lasketut) {
      const r = rivit.get(l.nimi);
      if (r) {
        r.numero ??= l.numero;
        r.pelipaikka ??= l.pelipaikka;
        r.kapteeni ??= l.kapteeni;
        for (const k of ["O", "M", "S", "J"]) r[k] += l[k];
      } else if (l.O > 0) {
        rivit.set(l.nimi, { ...l });
      }
    }
    return [...rivit.values()];
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
      rivit.set(avain(p), { ...p, O: 0, V: 0, T: 0, PM: 0, NP: 0 });
    }
    for (const o of ottelut) {
      for (const mv of o.maalivahdit) {
        const r = rivit.get(mv.pelaaja);
        if (!r) throw new Error("Maalivahtia ei löydy: " + mv.pelaaja);
        r.O++;
        // Jos torjunnat puuttuvat yhdestäkin ottelusta, niitä ei lasketa.
        r.T = r.T == null || mv.torjunnat == null ? null : r.T + mv.torjunnat;
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
          torjuntaPros: r.T != null && laukaukset ? r.T / laukaukset : null,
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

  // Kauden pelaajarivit: kokonaisluvut + niiden jälkeen pelatut ottelut.
  function kaudenPelaajat(kausi) {
    const lasketut = laskePelaajat(kausi.pelaajat || [], kausi.ottelut || []);
    return kausi.pelaajatilastot ? yhdista(kausi.pelaajatilastot, lasketut) : lasketut;
  }

  // Laskee kaikkien kausien rivit yhteen nimen perusteella.
  function summaaKaudet(rivitKausittain, kentat) {
    const summat = new Map();
    for (const rivit of rivitKausittain) {
      for (const r of rivit) {
        const s = summat.get(r.nimi) ?? summat.set(r.nimi, { nimi: r.nimi, kaudet: 0 }).get(r.nimi);
        s.kaudet++;
        for (const k of kentat) if (r[k] != null) s[k] = (s[k] ?? 0) + r[k];
      }
    }
    return [...summat.values()];
  }

  function kaikkiKaudet() {
    const ekat = data.kaudet.at(-1).nimi.match(/\d{4}/)[0];
    const vikat = data.kaudet[0].nimi.match(/\d{4}–\d{2}/)?.[0].slice(-2) ?? "";
    return {
      nimi: "Kaikki kaudet",
      tilanne: `${ekat}–${vikat}`,
      kaikki: true,
      pelaajatilastot: summaaKaudet(data.kaudet.map(kaudenPelaajat), ["O", "M", "S", "J"]),
      maalivahtitilastot: summaaKaudet(
        data.kaudet.map((k) => k.maalivahtitilastot || []), ["O", "V", "TP", "H", "PM", "J", "S"]),
    };
  }

  function piirraKausi(kausi) {
    const ottelut = [...(kausi.ottelut || [])].sort((a, b) => a.pvm.localeCompare(b.pvm));
    const pelaajat = kausi.pelaajat || [];
    const nimi = (a) => pelaajat.find((p) => avain(p) === a)?.nimi ?? "#" + a;
    const onOttelut = ottelut.length > 0;

    document.title = `${data.joukkue} – ${kausi.nimi}`;
    // Kokonaislukujen päälle lisätyistä otteluista ei voi laskea koko kauden
    // joukkue- ja maalivahtitilastoja, joten niistä näytetään vain ottelulista.
    const onKokonaiset = Boolean(kausi.pelaajatilastot);
    const tilanne = onKokonaiset && onOttelut ? pvm(ottelut.at(-1).pvm) : kausi.tilanne;
    document.getElementById("tilanne").textContent =
      kausi.kaikki ? `Talvisarjat ${tilanne}` : tilanne ? `Tilanne ${tilanne}` : "";
    for (const id of ["yhteenveto", "joukkue"]) naytaOsio(id, onOttelut && !onKokonaiset);
    naytaOsio("maalivahdit", Boolean(kausi.maalivahtitilastot) || (onOttelut && !onKokonaiset));
    naytaOsio("ottelut", onOttelut);
    if (kausi.maalivahtitilastot) piirraMaalivahtitilastot(kausi.maalivahtitilastot);

    const pisteet = pistejarjestys(kaudenPelaajat(kausi));
    const onKaudet = pisteet.some((r) => r.kaudet != null);
    const onNumerot = pisteet.some((r) => r.numero != null);
    const onPaikat = pisteet.some((r) => r.pelipaikka);
    const perOttelu = (x, r) => (r.O ? desim(x / r.O) : "–");
    document.getElementById("pelaajat").replaceChildren(taulukko([
      { otsikko: "Sija", luku: true, arvo: (r) => r.sija + "." },
      onNumerot && { otsikko: "#", luku: true, arvo: (r) => r.numero ?? "" },
      { otsikko: "Pelaaja", arvo: (r) => r.nimi + (r.kapteeni ? ` (${r.kapteeni})` : "") },
      onPaikat && { otsikko: "PP", selite: "Pelipaikka", arvo: (r) => r.pelipaikka ?? "" },
      onKaudet && { otsikko: "K", selite: "Kaudet", luku: true, arvo: (r) => r.kaudet },
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
    piirraOttelut(ottelut, nimi);
    if (onKokonaiset) return;

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

    const mv = laskeMaalivahdit(pelaajat, ottelut);
    const onTorjunnat = mv.some((r) => r.T != null);
    document.getElementById("maalivahdit").replaceChildren(taulukko([
      mv.some((r) => r.numero != null) && { otsikko: "#", luku: true, arvo: (r) => r.numero ?? "" },
      { otsikko: "Maalivahti", arvo: (r) => r.nimi },
      { otsikko: "O", selite: "Ottelut", luku: true, arvo: (r) => r.O },
      { otsikko: "V", selite: "Voitot", luku: true, arvo: (r) => r.V },
      onTorjunnat && { otsikko: "T", selite: "Torjunnat", luku: true, arvo: (r) => r.T ?? "–" },
      { otsikko: "PM", selite: "Päästetyt maalit", luku: true, arvo: (r) => r.PM },
      onTorjunnat && { otsikko: "T%", selite: "Torjuntaprosentti", luku: true, arvo: (r) => pros(r.torjuntaPros) },
      { otsikko: "PM/O", selite: "Päästetyt maalit per ottelu", luku: true, arvo: (r) => desim(r.pmKa) },
      { otsikko: "NP", selite: "Nollapelit", luku: true, arvo: (r) => r.NP },
    ].filter(Boolean), mv));
  }

  function piirraMaalivahtitilastot(rivit) {
    document.getElementById("maalivahdit").replaceChildren(taulukko([
      { otsikko: "Maalivahti", arvo: (r) => r.nimi },
      rivit.some((r) => r.kaudet != null) && { otsikko: "K", selite: "Kaudet", luku: true, arvo: (r) => r.kaudet },
      { otsikko: "O", selite: "Ottelut", luku: true, arvo: (r) => r.O },
      { otsikko: "V", selite: "Voitot", luku: true, arvo: (r) => r.V ?? "–" },
      { otsikko: "TP", selite: "Tasapelit", luku: true, arvo: (r) => r.TP ?? "–" },
      { otsikko: "H", selite: "Häviöt", luku: true, arvo: (r) => r.H ?? "–" },
      { otsikko: "PM", selite: "Päästetyt maalit", luku: true, arvo: (r) => r.PM ?? "–" },
      { otsikko: "PM/O", selite: "Päästetyt maalit per ottelu", luku: true, arvo: (r) => (r.PM != null && r.O ? desim(r.PM / r.O) : "–") },
      rivit.some((r) => r.S != null) && { otsikko: "S", selite: "Syötöt", luku: true, arvo: (r) => r.S ?? 0 },
      { otsikko: "J", selite: "Jäähyminuutit", luku: true, arvo: (r) => r.J ?? 0 },
    ].filter(Boolean), [...rivit].sort((a, b) => b.O - a.O)));
  }

  // "Pelaaja A 2, Pelaaja B" maalimäärän mukaan järjestettynä.
  function maalintekijat(o, nimi) {
    const maarat = new Map();
    for (const m of o.maalit) maarat.set(m.maali, (maarat.get(m.maali) || 0) + 1);
    return [...maarat]
      .sort((a, b) => b[1] - a[1])
      .map(([nro, n]) => nimi(nro) + (n > 1 ? " " + n : ""))
      .join(", ") || "–";
  }

  function piirraOttelut(ottelut, nimi) {
    document.getElementById("ottelut").replaceChildren(taulukko([
      { otsikko: "Pvm", arvo: (o) => pvm(o.pvm) },
      // Jos koti/vieras ei ole tiedossa (koti puuttuu), oma joukkue näytetään ensin.
      { otsikko: "Ottelu", arvo: (o) => (o.koti !== false ? `${data.joukkue} – ${o.vastustaja}` : `${o.vastustaja} – ${data.joukkue}`) },
      { otsikko: "Tulos", arvo: (o) => (o.koti !== false ? `${o.omat}–${o.vastustajan}` : `${o.vastustajan}–${o.omat}`) + (o.jatkoaika ? " ja" : "") },
      { otsikko: "", arvo: (o) => otteluTulos(o) },
      { otsikko: "Omat maalintekijät", rivita: true, arvo: (o) => maalintekijat(o, nimi) },
    ], [...ottelut].reverse()));
  }

  function piirra() {
    document.getElementById("otsikko").textContent = data.joukkue;
    const valinta = document.getElementById("kausi");
    valinta.replaceChildren(
      ...data.kaudet.map((k, i) => el("option", { value: i }, k.nimi)),
      el("option", { value: "kaikki" }, "Kaikki kaudet (all-time)"));
    valinta.disabled = data.kaudet.length < 2;
    valinta.onchange = () =>
      naytaKausi(valinta.value === "kaikki" ? kaikkiKaudet() : data.kaudet[valinta.value]);
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
