# Piano operativo — perfezionamento pagina Servizi (Ruflo / Hotel Dream)

## Obiettivi UX completati (sessione corrente)

1. **FAQ interattive** — Domande come `<summary>` dentro `<details>`: cliccabili, risposte collassabili, focus ring tastiera, chevron animato. Allineamento testi alle FAQ JSON-LD (`geo.ts`).
2. **Griglia servizi** — Icona per ogni card (emoji in box arrotondato + hover coerente con brand navy/gold).
3. **Foto** — Regola globale `main img.object-cover` con `border-radius` leggero (logo in Header/Footer esclusi perché fuori da `<main>`).

## Prompt / checklist per iterazioni future

- **i18n FAQ**: spostare stringhe FAQ in `messages/{locale}.json` e mappare `getServicesFaqSchema()` da stessa sorgente.
- **Icone**: sostituire emoji con set SVG monochrome (es. Lucide) se serve uniformità cross-platform.
- **Analytics**: evento `faq_toggle` su apertura domanda (se si passa a client component).
- **Test**: verificare `group-open` su Safari iOS per accordion.

## Verifica rapida

- `npm run build`
- Controllare pagina `/it/servizi` — sezione FAQ, griglia 12 servizi, hero immagine arrotondata.

## Mapping foto camere (PNG, `public/images/camere/`)

| File sito | Contenuto |
|-----------|-----------|
| `camera-singola.png` | Camera singola |
| `camera-doppia.png` | Doppia (file `camera_doppia_`) |
| `camera-suite.png` | Suite / doppia standard (`doppia_standard`) |
| `camera-tripla.png` | Tripla principale (`camera_tripla-52c0…`) |
| `camera-quadrupla.png` | Quadrupla (`camera_quadrupla_-9053…`) |
| `camera-gruppo.png` | Gruppo — variante tripla ampia (`camera_tripla__2_`) |
| `camera-familiare.png` | Familiare — letto + castello (`camera_quadrupla-16715…`) |
| `../hero-camere-letto.png` | Hero pagina Camere — dettaglio letto (`dettaglio_camera_doppia`) |
| `../hotel-lobby-1/2.png` | Hall (pagina Hotel) |

Asset non usati in repo (sostituibili a mano se serve): `camera_tripla_-b0b6655e`, `camera_tripla__1_`.
