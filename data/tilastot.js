// Salem Zealots – tilastojen lähdetiedot.
// Kaikki sivun tilastot lasketaan tästä tiedostosta. Jokainen kausi
// (tai sarjavaihe) on oma kohtansa "kaudet"-listassa; uusin ensin.
//
// Kauden tiedot voi antaa kahdella tavalla (ks. README):
//  1. pelaajatilastot: valmiit kokonaisluvut pelaajittain
//     (O = ottelut, M = maalit, S = syötöt, J = jäähyminuutit).
//     Pisteet ja per ottelu -luvut lasketaan automaattisesti.
//     Valinnaiset: kapteeni ("C" tai "A"), numero, pelipaikka.
//     maalivahtitilastot: valmiit maalivahtien kokonaisluvut (ks. README).
//     Kauden "tilanne" kertoo, minkä päivän tilanteesta luvut ovat.
//  2. pelaajat + ottelut: ottelukohtaiset tiedot, joista lasketaan myös
//     joukkue- ja maalivahtitilastot sekä otteluluettelo.

window.TILASTOT = {
  joukkue: "Salem Zealots",

  kaudet: [
    {
      nimi: "Runkosarja 2025–2026",
      pelaajatilastot: [
        { nimi: "Roni Joentausta", O: 15, M: 7, S: 19, J: 6 },
        { nimi: "Jesse Ramsten", O: 13, M: 18, S: 7, J: 15 },
        { nimi: "Kalle Koivusalo", O: 15, M: 7, S: 14, J: 0 },
        { nimi: "Kimmo Hyvärinen", O: 15, M: 6, S: 13, J: 6 },
        { nimi: "Miko Olander", O: 11, M: 9, S: 9, J: 12 },
        { nimi: "Ville Sainio", O: 16, M: 6, S: 9, J: 3 },
        { nimi: "Saku-Pekka Aaramaa", O: 14, M: 4, S: 9, J: 6 },
        { nimi: "Severi Tammivuo", O: 8, M: 6, S: 3, J: 9 },
        { nimi: "Chris Bezek", O: 11, M: 6, S: 2, J: 19 },
        { nimi: "Joel Järvinen", O: 11, M: 3, S: 4, J: 0 },
        { nimi: "Ville Vine", O: 11, M: 4, S: 2, J: 6 },
        { nimi: "Mikael Lehtinen", O: 3, M: 5, S: 0, J: 0 },
        { nimi: "Jussi Lehtisaari", O: 6, M: 2, S: 3, J: 9 },
        { nimi: "Sami Heinonen", O: 4, M: 1, S: 4, J: 3 },
        { nimi: "Veeti Vesaranta", O: 13, M: 0, S: 4, J: 6 },
        { nimi: "Aapo Jokinen", O: 6, M: 2, S: 1, J: 3 },
        { nimi: "Titus Naamanka", O: 1, M: 1, S: 2, J: 0 },
        { nimi: "Oskari Vettenranta", O: 15, M: 0, S: 3, J: 3 },
      ],
    },
    {
      nimi: "Runkosarja 2024–2025",
      tilanne: "10.1.2025",
      pelaajatilastot: [
        { nimi: "Kalle Koivusalo", O: 13, M: 4, S: 10, J: 9 },
        { nimi: "Kimmo Hyvärinen", O: 9, M: 7, S: 6, J: 3 },
        { nimi: "Ville Sainio", O: 8, M: 9, S: 3, J: 0 },
        { nimi: "Chris Bezek", O: 13, M: 8, S: 4, J: 9 },
        { nimi: "Saku-Pekka Aaramaa", kapteeni: "C", O: 10, M: 3, S: 8, J: 3 },
        { nimi: "Eemil Kronqvist", O: 4, M: 8, S: 2, J: 3 },
        { nimi: "Roni Joentausta", kapteeni: "A", O: 8, M: 5, S: 4, J: 3 },
        { nimi: "Oskari Vettenranta", O: 12, M: 2, S: 6, J: 3 },
        { nimi: "Lassi Mäkelä", O: 3, M: 3, S: 1, J: 0 },
        { nimi: "Jussi Lehtisaari", O: 2, M: 2, S: 2, J: 6 },
        { nimi: "Veeti Vesaranta", O: 13, M: 1, S: 3, J: 3 },
        { nimi: "Aleksi Pucilowski", O: 2, M: 2, S: 1, J: 0 },
        { nimi: "Aapo Jokinen", O: 6, M: 0, S: 3, J: 6 },
        { nimi: "Miika Heinonen", O: 1, M: 1, S: 1, J: 0 },
        { nimi: "Mikael Lehtinen", O: 1, M: 1, S: 1, J: 0 },
        { nimi: "Ville Vine", kapteeni: "A", O: 10, M: 0, S: 2, J: 0 },
        { nimi: "Miska Päivärinta", O: 7, M: 0, S: 1, J: 0 },
        { nimi: "Jarkko Frigård", O: 1, M: 0, S: 1, J: 6 },
        { nimi: "Miko Olander", O: 1, M: 0, S: 1, J: 0 },
        { nimi: "Erik Hieta-Aho", O: 6, M: 0, S: 0, J: 6 },
        { nimi: "Topi Ylihärsilä", O: 1, M: 0, S: 0, J: 0 },
        { nimi: "Matti Karjalainen", O: 1, M: 0, S: 0, J: 0 },
      ],
      // Tilanteen 10.1.2025 jälkeen pelatut ottelut lisätään yllä oleviin lukuihin.
      pelaajat: [
        { numero: 1, nimi: "Pekko Mörö", pelipaikka: "MV" },
        { numero: 2, nimi: "Miko Olander" },
        { numero: 3, nimi: "Roni Joentausta" },
        { numero: 5, nimi: "Topi Ylihärsilä" },
        { numero: 9, nimi: "Kalle Koivusalo" },
        { numero: 12, nimi: "Mikael Lehtinen" },
        { numero: 14, nimi: "Erik Hieta-Aho" },
        { numero: 16, nimi: "Miska Päivärinta" },
        { numero: 18, nimi: "Miika Heinonen" },
        { numero: 23, nimi: "Eemil Kronqvist" },
        { numero: 24, nimi: "Chris Bezek" },
        { numero: 25, nimi: "Ville Sainio" },
        { numero: 26, nimi: "Veeti Vesaranta" },
        { numero: 35, nimi: "Saku-Pekka Aaramaa" },
        { numero: 39, nimi: "Severi Tammivuo" },
        { numero: 40, nimi: "Juhana Kronqvist" },
        { numero: 47, nimi: "Jussi Lehtisaari" },
        { numero: 49, nimi: "Kimmo Hyvärinen" },
        { numero: 63, nimi: "Aapo Jokinen" },
        { numero: 71, nimi: "Matti Karjalainen" },
        { numero: 73, nimi: "Oskari Vettenranta" },
        { numero: 84, nimi: "Ville Vine" },
      ],
      ottelut: [
        {
          pvm: "2025-01-26",
          vastustaja: "Wäskynä",
          koti: true,
          omat: 11,
          vastustajan: 1,
          jatkoaika: false,
          pelanneet: [1, 2, 3, 9, 16, 24, 25, 35, 39, 49, 63, 71, 73, 84],
          maalit: [
            { maali: 3, syotot: [] },
            { maali: 9, syotot: [] },
            { maali: 9, syotot: [] },
            { maali: 24, syotot: [] },
            { maali: 24, syotot: [] },
            { maali: 35, syotot: [] },
            { maali: 49, syotot: [] },
            { maali: 49, syotot: [] },
            { maali: 71, syotot: [] },
            { maali: 39, syotot: [] },
            { maali: 39, syotot: [] },
          ],
          // Pöytäkirjassa syötöt on merkitty pelaajittain, ei maaleittain.
          syotot: [
            { pelaaja: 3, maara: 1 },
            { pelaaja: 9, maara: 2 },
            { pelaaja: 16, maara: 1 },
            { pelaaja: 24, maara: 2 },
            { pelaaja: 25, maara: 1 },
            { pelaaja: 49, maara: 2 },
            { pelaaja: 63, maara: 2 },
            { pelaaja: 73, maara: 1 },
            { pelaaja: 84, maara: 1 },
            { pelaaja: 2, maara: 3 },
            { pelaaja: 39, maara: 1 },
          ],
          jaahyt: [{ pelaaja: 2, min: 3 }],
          maalivahdit: [{ pelaaja: 1, paastetyt: 1 }],
        },
        {
          pvm: "2025-02-21",
          vastustaja: "Pyynikin Pelikaanit",
          koti: false,
          omat: 5,
          vastustajan: 8,
          jatkoaika: false,
          pelanneet: [1, 2, 3, 14, 16, 18, 25, 35, 39, 49, 63, 73],
          maalit: [
            { maali: 3, syotot: [] },
            { maali: 14, syotot: [] },
            { maali: 2, syotot: [] },
            { maali: 2, syotot: [] },
            { maali: 39, syotot: [] },
          ],
          syotot: [
            { pelaaja: 2, maara: 3 },
            // Joentaustan 2 syöttöä puuttuvat pöytäkirjasta.
            { pelaaja: 3, maara: 2 },
          ],
          jaahyt: [],
          maalivahdit: [{ pelaaja: 1, paastetyt: 8 }],
        },
        {
          pvm: "2025-03-14",
          vastustaja: "Ylämummo",
          koti: true,
          omat: 7,
          vastustajan: 3,
          jatkoaika: false,
          pelanneet: [1, 2, 3, 9, 12, 14, 16, 24, 25, 35, 39, 47, 71, 73],
          // Pöytäkirjassa Aaramaalle 2 maalia; toinen niistä kuuluu Lehtiselle.
          maalit: [
            { maali: 9, syotot: [] },
            { maali: 14, syotot: [] },
            { maali: 24, syotot: [] },
            { maali: 24, syotot: [] },
            { maali: 35, syotot: [] },
            { maali: 12, syotot: [] },
            { maali: 2, syotot: [] },
          ],
          syotot: [
            { pelaaja: 9, maara: 1 },
            { pelaaja: 25, maara: 1 },
            { pelaaja: 73, maara: 1 },
            { pelaaja: 12, maara: 1 },
            // Aaramaan ja Joentaustan syötöt puuttuvat pöytäkirjasta.
            { pelaaja: 35, maara: 1 },
            { pelaaja: 3, maara: 1 },
          ],
          jaahyt: [{ pelaaja: 24, min: 3 }],
          maalivahdit: [{ pelaaja: 1, paastetyt: 3 }],
        },
      ],
    },
    {
      nimi: "Talvi 2023",
      // Lähde: Pisteporssi_talvi23.xlsx. Vierailijoiden yhteisrivi
      // (8 O, 8+3=11, 6 min) jätetty pois.
      pelaajatilastot: [
        { nimi: "Eemil Kronqvist", O: 11, M: 29, S: 13, J: 12 },
        { nimi: "Roni Joentausta", O: 15, M: 12, S: 22, J: 6 },
        { nimi: "Kalle Koivusalo", O: 14, M: 14, S: 14, J: 9 },
        { nimi: "Kimmo Hyvärinen", O: 15, M: 11, S: 17, J: 0 },
        { nimi: "Saku-Pekka Aaramaa", O: 17, M: 7, S: 15, J: 9 },
        { nimi: "Aapo Jokinen", O: 12, M: 5, S: 12, J: 0 },
        { nimi: "Chris Bezek", O: 11, M: 4, S: 10, J: 18 },
        { nimi: "Miska Päivärinta", O: 14, M: 3, S: 7, J: 0 },
        { nimi: "Matti Karjalainen", O: 6, M: 4, S: 6, J: 3 },
        { nimi: "Ville Sainio", O: 13, M: 3, S: 6, J: 6 },
        { nimi: "Antti Visuri", O: 11, M: 5, S: 3, J: 6 },
        { nimi: "Erik Hieta-Aho", O: 12, M: 0, S: 7, J: 9 },
        { nimi: "Jussi Lehtisaari", O: 6, M: 3, S: 3, J: 3 },
        { nimi: "Topi Ylihärsilä", O: 5, M: 0, S: 3, J: 3 },
        { nimi: "Ville Aho", O: 10, M: 0, S: 3, J: 12 },
        { nimi: "Ville Vine", O: 7, M: 0, S: 3, J: 0 },
        { nimi: "Juhana Kronqvist", O: 3, M: 1, S: 0, J: 6 },
        { nimi: "Marko Viitanen", O: 1, M: 0, S: 0, J: 3 },
      ],
      // V = voitot, H = häviöt, TP = tasapelit, PM = päästetyt maalit
      maalivahtitilastot: [
        { nimi: "Pekko Mörö", O: 18, V: 12, H: 3, TP: 3, PM: 87, J: 3 },
      ],
    },
    {
      nimi: "Talvi 2022",
      // Lähde: Pisteporssi_talvi22.xlsx. Vierailijoiden yhteisrivit
      // (kenttäpelaajat 7 O, 4+5=9; maalivahdit 4 O, 2–0–2, 20 PM, 1 S)
      // sekä pelaajat ilman otteluita jätetty pois.
      pelaajatilastot: [
        { nimi: "Roni Joentausta", O: 16, M: 30, S: 14, J: 9 },
        { nimi: "Ville Aho", O: 18, M: 2, S: 7, J: 6 },
        { nimi: "Miika Heinonen", O: 3, M: 1, S: 0, J: 6 },
        { nimi: "Eemil Kronqvist", O: 11, M: 30, S: 2, J: 12 },
        { nimi: "Chris Bezek", O: 13, M: 12, S: 7, J: 3 },
        { nimi: "Ville Sainio", O: 17, M: 16, S: 7, J: 9 },
        { nimi: "Kalle Peltonen", O: 8, M: 3, S: 13, J: 6 },
        { nimi: "Saku-Pekka Aaramaa", O: 13, M: 1, S: 12, J: 30 },
        { nimi: "Juhana Kronqvist", O: 9, M: 4, S: 7, J: 24 },
        { nimi: "Jussi Lehtisaari", O: 11, M: 1, S: 11, J: 15 },
        { nimi: "Aapo Jokinen", O: 14, M: 3, S: 14, J: 9 },
        { nimi: "Matti Karjalainen", O: 10, M: 3, S: 3, J: 6 },
        { nimi: "Ville Vine", O: 11, M: 0, S: 4, J: 0 },
        { nimi: "Erik Hieta-Aho", O: 11, M: 0, S: 8, J: 9 },
        { nimi: "Kimmo Hyvärinen", O: 14, M: 10, S: 24, J: 6 },
      ],
      maalivahtitilastot: [
        { nimi: "Pekko Mörö", O: 13, V: 9, H: 1, TP: 3, PM: 39, J: 0, S: 2 },
        { nimi: "Saku-Pekka Aaramaa", O: 1, V: 1, H: 0, TP: 0, PM: 1, J: 0, S: 1 },
      ],
    },
  ],
};
