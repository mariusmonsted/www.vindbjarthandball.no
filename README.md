# www.vindbjarthandball.no – kampdata og bilder

Dette repoet brukes av den nye nettsiden til Vindbjart Håndball (IdrettenOnline/Bloc).

## Kampdata
`hent-kamper.mjs` henter kampene til IL Vindbjart (klubbid 60781) fra handball.no for de neste 21 dagene og lagrer dem i `data/kamper.json`.
GitHub Actions kjører jobben hver natt kl. 03 UTC og ekstra lørdag og søndag kl. 11 UTC (se `.github/workflows/hent-kamper.yml`).
Den kan også kjøres manuelt under **Actions → Hent kamper fra handball.no → Run workflow**.

Kampsenteret på forsiden leser fila her:
`https://raw.githubusercontent.com/mariusmonsted/www.vindbjarthandball.no/main/data/kamper.json`

Kilden er handball.no sitt interne API (det samme som klubbdagboka bruker). Hvis jobben feiler, har handball.no trolig endret API-et.

## Bilder
`hoppskudd.jpg` er forsidebildet (midlertidig).

Laget av Claude etter ønske fra Marius Mønsted.
