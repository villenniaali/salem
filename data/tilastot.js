// Salem Zealots – tilastojen lähdetiedot.
// Kaikki sivun tilastot lasketaan tästä tiedostosta. Jokainen kausi
// (tai sarjavaihe) on oma kohtansa "kaudet"-listassa; uusin ensin.
//
// Kauden tiedot voi antaa kahdella tavalla (ks. README):
//  1. pelaajatilastot: valmiit kokonaisluvut pelaajittain
//     (O = ottelut, M = maalit, S = syötöt, J = jäähyminuutit).
//     Pisteet ja per ottelu -luvut lasketaan automaattisesti.
//     Valinnaiset: kapteeni ("C" tai "A"), numero, pelipaikka.
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
    },
  ],
};
