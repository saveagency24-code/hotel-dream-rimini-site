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
