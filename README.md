# Cocaine Hippos: After Us

En statisk sajt (Astro) om spekulativ evolution för invasiva arter, med Colombias flodhästar som första scenario. Sajten är på engelska.

## Kör lokalt

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # bygger till dist/
```

## Var innehållet finns

| Mapp | Innehåll |
|---|---|
| `src/content/scenarios/` | Scenariots faktasida med källor (nuläget) |
| `src/content/eras/` | En fil per era: `present`, `10ka`, `1ma`, `5ma`, `20ma`. `order` styr ordningen, `niches` är de öppna frågorna |
| `src/content/species/` | En fil per art. Filnamnet blir artens id och URL |
| `src/content.config.ts` | Schemat, alltså vilka fält som krävs |

### Lägga till en art (t.ex. ett godkänt bidrag)

Skapa `src/content/species/<id>.md`:

```markdown
---
name: Common name
binomial: Genus species
era: 5ma                      # id för en era
ancestor: hylopotamus-nanus   # id för en befintlig art
status: community             # real | canon | community
shape: hippo                  # hippo | croc | fish | bird | sirenian (platshållarsiluett)
summary: One sentence.
niche: ...
diet: ...
size: ...
habitat: ...
confidence: plausible         # established | plausible | speculative
credit:
  name: Contributor name
  url: https://...
niches:
  - question: An open follow-up question
---

## Basis in real science
...

## Speculation
...
```

Arten dyker automatiskt upp i släktträdet (`/tree/`), på erans sida, på förälderns sida under "Descendants" och får en egen delningsbild (`/og/<id>.png`).

## Bidrag

Formuläret på `/contribute/` använder **Netlify Forms**. Det fungerar först när sajten ligger på Netlify, och inskickade bidrag syns då under *Forms* i Netlify-panelen. Länkar under "Fill this niche" fyller i formuläret automatiskt med rätt nisch och era.

## Publicering

Sajten ligger på https://cocaine-hippos-after-us.netlify.app. Netlify bygger och publicerar automatiskt varje gång något skickas upp till `main` på GitHub.

## Presentation och foto

Texten skriver du i `src/author.md`. Fotot är `src/assets/author.png`: ersätt filen för att byta foto (den beskärs automatiskt till en cirkel).

## Synlighet

Nya artiklar och FAQ, strukturerad data (JSON-LD), RSS (`/rss.xml`), `robots.txt` och sitemap finns redan. Checklistan för Search Console och mejlutkasten ligger i `outreach/` och laddas inte upp till GitHub.

## Innan publicering

- Kontrollera faktauppgifterna på `src/content/scenarios/colombian-hippos.md` mot källorna. Populationssiffror och myndighetsbeslut ändras snabbt.
- Siluetterna är platshållare. Att låta konstnärer rita arterna är en bra första "challenge" att sprida på r/SpeculativeEvolution.
