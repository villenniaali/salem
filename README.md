# Salem Zealots – tilastot

Salem Zealots -jääkiekkojoukkueen tilastosivu. Sivu laskee yhdestä
datatiedostosta:

- **Joukkue**: ottelut, voitot/jatkoaikavoitot/-häviöt/häviöt, maalit, maaliero, sarjapisteet (3–2–1–0)
- **Pistepörssi**: pelaajien ottelut, maalit, syötöt, pisteet, pisteet/ottelu ja jäähyminuutit
- **Maalivahdit**: ottelut, voitot, torjunnat, päästetyt maalit, torjuntaprosentti, päästetyt/ottelu, nollapelit
- **Ottelut**: tulokset ja maalintekijät

## Käyttö

Avaa `index.html` selaimessa – palvelinta tai asennuksia ei tarvita.
Sivun voi julkaista sellaisenaan esim. GitHub Pagesissa.

## Tietojen päivitys

Kaikki tiedot ovat tiedostossa [`data/tilastot.js`](data/tilastot.js).
Nykyinen sisältö on **esimerkkidataa** – korvaa pelaajat ja ottelut omillasi.

Uusi ottelu lisätään `ottelut`-listaan:

```js
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
  maalivahdit: [{ pelaaja: 1, torjunnat: 25, paastetyt: 2 }],
}
```

Jos datassa viitataan pelinumeroon, jota ei ole `pelaajat`-listassa,
sivulle tulee virheilmoitus.
