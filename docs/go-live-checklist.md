# Go-Live Checklist (Hotel Dream Rimini)

## 1) GitHub Setup
- Ensure `main` is protected (required pull request, no direct push).
- Create branch `staging` for pre-production tests.
- Add repository secrets for deployment/analytics values.

## 2) Vercel Setup
- Import repository in Vercel.
- Configure two environments:
  - `Preview` for staging review.
  - `Production` for public domain.
- Add environment variables from `.env.example`.

## 3) Domain and DNS
- Connect `hoteldreamrimini.it` to Vercel.
- Decide canonical host:
  - preferred: `https://hoteldreamrimini.it`
- Redirect non-canonical host to canonical.
- Verify SSL is active.

## 4) Pre-Launch QA
- Language switch works (`it`, `en`, `de`) without 404.
- Forms: contact/newsletter mailto and CTA links.
- Critical pages return `200`: home, hotel, camere, servizi, offerte, attrazioni, contatti.
- `robots.txt` and `sitemap.xml` accessible.

## 5) Search Engine Activation
- Verify Google Search Console (domain property).
- Submit sitemap URL.
- Check indexing coverage after launch.

## 6) Post-Launch Monitoring (first 14 days)
- Monitor:
  - 404 and redirect errors
  - server errors
  - page indexing status
  - lead events (phone, WhatsApp, form submit)
