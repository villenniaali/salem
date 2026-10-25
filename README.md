# Salem Zealots – tilastot

Salem Zealots -jääkiekkojoukkueen tilastosivu. Avaa `index.html` selaimessa –
palvelinta tai asennuksia ei tarvita. Sivun voi julkaista sellaisenaan esim.
GitHub Pagesissa.

Sivu näyttää kausittain:

- **Pistepörssi**: sija, ottelut, maalit, syötöt, pisteet, jäähyminuutit ja per ottelu -luvut
- ottelukohtaisista tiedoista lisäksi **joukkueen** tilastot (V/JV/JH/H, maalit, sarjapisteet 3–2–1–0),
  **maalivahtien** tilastot (torjunnat, T%, nollapelit) ja **otteluluettelo**

Kausi valitaan otsikon alta, kun kausia on useampi.

## Tietojen päivitys

Kaikki tiedot ovat tiedostossa [`data/tilastot.js`](data/tilastot.js), jossa
jokainen kausi tai sarjavaihe on oma kohtansa `kaudet`-listassa (uusin ensin).
Kauden tiedot voi antaa kahdella tavalla.

### 1. Valmiit kokonaisluvut

Riittää pistepörssiin. Pisteet, sijat ja per ottelu -luvut lasketaan itse.

```js
{
  nimi: "Runkosarja 2025–2026",
  pelaajatilastot: [
    // O = ottelut, M = maalit, S = syötöt, J = jäähyminuutit
    { nimi: "Pelaaja Yksi", O: 15, M: 7, S: 19, J: 6 },
  ],
}
```

Rivillä voi olla myös `kapteeni` ("C" tai "A"), `numero` ja `pelipaikka` ("H", "P"),
jolloin ne näkyvät taulukossa. Jos luvut ovat kesken kauden, kaudelle voi
lisätä kentän `tilanne: "10.1.2025"`, joka näytetään kausivalinnan vieressä.

Kokonaislukujen jälkeen pelatut ottelut voi lisätä samalle kaudelle
`pelaajat`- ja `ottelut`-listoina (ks. alla). Ne lasketaan kokonaislukujen
päälle; pelaajat yhdistetään nimellä. Joukkue- ja maalivahtitilastoja ei
tällöin näytetä, koska ne olisivat vain osasta kautta.

### 2. Ottelukohtaiset tiedot

Tästä lasketaan myös joukkue- ja maalivahtitilastot sekä otteluluettelo.

```js
{
  nimi: "Runkosarja 2026–2027",
  // pelipaikka: "H" = hyökkääjä, "P" = puolustaja, "MV" = maalivahti
  pelaajat: [
    { numero: 1, nimi: "Maalivahti", pelipaikka: "MV" },
    { numero: 4, nimi: "Puolustaja", pelipaikka: "P" },
    { numero: 11, nimi: "Hyökkääjä", pelipaikka: "H" },
  ],
  ottelut: [
    {
      pvm: "2026-10-25",
      vastustaja: "Vastustaja HC",
      koti: true,              // kotiottelu?
      omat: 3,                 // omat maalit
      vastustajan: 2,          // vastustajan maalit
      jatkoaika: false,        // ratkesiko jatkoajalla / voittolaukauksilla
      pelanneet: [1, 4, 11],   // pelanneiden pelinumerot
      maalit: [                // omat maalit: tekijä ja 0–2 syöttäjää
        { maali: 11, syotot: [4] },
      ],
      jaahyt: [{ pelaaja: 4, min: 2 }],
      maalivahdit: [{ pelaaja: 1, torjunnat: 25, paastetyt: 2 }],  // torjunnat voi jättää pois
    },
  ],
}
```

Jos pöytäkirjassa syötöt on merkitty vain pelaajittain, jätä maalien
`syotot` tyhjiksi ja anna ne ottelulle erikseen:
`syotot: [{ pelaaja: 4, maara: 2 }]`.

Jos ottelutiedoissa viitataan pelinumeroon, jota ei ole `pelaajat`-listassa,
sivulle tulee virheilmoitus.
