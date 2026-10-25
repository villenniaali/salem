// Salem Zealots – tilastojen lähdetiedot.
// Kaikki sivun tilastot lasketaan tästä tiedostosta. Lisää uusi ottelu
// "ottelut"-listan loppuun; pelaajiin viitataan pelinumerolla.
//
// HUOM: alla oleva sisältö on esimerkkidataa. Korvaa omilla tiedoillasi.

window.TILASTOT = {
  joukkue: "Salem Zealots",
  kausi: "2026–2027",

  // pelipaikka: "H" = hyökkääjä, "P" = puolustaja, "MV" = maalivahti
  pelaajat: [
    { numero: 1, nimi: "Esimerkki Maalivahti", pelipaikka: "MV" },
    { numero: 4, nimi: "Esimerkki Puolustaja", pelipaikka: "P" },
    { numero: 7, nimi: "Toinen Puolustaja", pelipaikka: "P" },
    { numero: 11, nimi: "Esimerkki Keskushyökkääjä", pelipaikka: "H" },
    { numero: 17, nimi: "Esimerkki Laituri", pelipaikka: "H" },
    { numero: 22, nimi: "Toinen Laituri", pelipaikka: "H" },
    { numero: 30, nimi: "Varamaalivahti", pelipaikka: "MV" },
  ],

  // tulos: omat / vastustajan maalit. jatkoaika: true, jos ratkesi
  // jatkoajalla tai voittolaukauskilpailussa.
  // pelanneet: pelinumerot, jotka pelasivat ottelussa (maalivahdit mukaan).
  // maalit: vain omat maalit; syotot 0–2 pelinumeroa.
  // jaahyt: pelinumero ja minuutit.
  // maalivahdit: torjunnat ja päästetyt maalit maalivahdeittain.
  ottelut: [
    {
      pvm: "2026-10-04",
      vastustaja: "Esimerkki HC",
      koti: true,
      omat: 4,
      vastustajan: 2,
      jatkoaika: false,
      pelanneet: [1, 4, 7, 11, 17, 22],
      maalit: [
        { maali: 11, syotot: [17, 4] },
        { maali: 17, syotot: [11] },
        { maali: 22, syotot: [7, 11] },
        { maali: 11, syotot: [] },
      ],
      jaahyt: [
        { pelaaja: 4, min: 2 },
        { pelaaja: 22, min: 2 },
      ],
      maalivahdit: [{ pelaaja: 1, torjunnat: 24, paastetyt: 2 }],
    },
    {
      pvm: "2026-10-11",
      vastustaja: "Testi Tigers",
      koti: false,
      omat: 2,
      vastustajan: 3,
      jatkoaika: true,
      pelanneet: [4, 7, 11, 17, 22, 30],
      maalit: [
        { maali: 4, syotot: [11, 22] },
        { maali: 17, syotot: [11] },
      ],
      jaahyt: [{ pelaaja: 7, min: 2 }],
      maalivahdit: [{ pelaaja: 30, torjunnat: 29, paastetyt: 3 }],
    },
    {
      pvm: "2026-10-18",
      vastustaja: "Malli Kiekko",
      koti: true,
      omat: 1,
      vastustajan: 3,
      jatkoaika: false,
      pelanneet: [1, 4, 7, 11, 17],
      maalit: [{ maali: 7, syotot: [17] }],
      jaahyt: [
        { pelaaja: 11, min: 2 },
        { pelaaja: 17, min: 10 },
      ],
      maalivahdit: [{ pelaaja: 1, torjunnat: 31, paastetyt: 3 }],
    },
  ],
};
