# Core Web Vitals Checklist

## Obiettivo
Migliorare LCP/INP/CLS su mobile per pagine principali (`home`, `servizi`, `offerte`, `contatti`).

## Azioni implementate nel codice
- `sizes` aggiunti alle immagini `next/image` con `fill`.
- Compressione HTTP attiva (`compress: true`).
- Cache immagini aumentata (`minimumCacheTTL`).
- Header `X-Powered-By` disattivato.

## Azioni operative da completare
- Convertire immagini pesanti in WebP/AVIF sorgente (specialmente hero e offerte).
- Verificare peso immagini sotto i 300-500KB per asset above-the-fold.
- Eseguire Lighthouse mobile su:
  - `/it`
  - `/it/servizi`
  - `/it/offerte`
  - `/it/contatti`
- Monitorare CrUX/PageSpeed dopo deploy per 28 giorni.
