// Salem Zealots – tilastojen lähdetiedot.
// Kaikki sivun tilastot lasketaan tästä tiedostosta. Jokainen kausi
// (tai sarjavaihe) on oma kohtansa "kaudet"-listassa; uusin ensin.
//
// Kauden tiedot voi antaa kahdella tavalla (ks. README):
//  1. pelaajatilastot: valmiit kokonaisluvut pelaajittain
//     (O = ottelut, M = maalit, S = syötöt, J = jäähyminuutit).
//     Pisteet ja per ottelu -luvut lasketaan automaattisesti.
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
  ],
};
