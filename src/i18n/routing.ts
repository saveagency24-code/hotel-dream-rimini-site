import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en", "de"],
  defaultLocale: "it",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/hotel": "/hotel",
    "/camere": {
      it: "/camere",
      en: "/rooms",
      de: "/zimmer",
    },
    "/servizi": {
      it: "/servizi",
      en: "/services",
      de: "/services",
    },
    "/offerte": {
      it: "/offerte",
      en: "/offers",
      de: "/angebote",
    },
    "/attrazioni": {
      it: "/attrazioni",
      en: "/attractions",
      de: "/attraktionen",
    },
    "/contatti": {
      it: "/contatti",
      en: "/contacts",
      de: "/kontakt",
    },
    "/come-arrivare": {
      it: "/come-arrivare",
      en: "/how-to-reach",
      de: "/anreise",
    },
    "/hotel-vicino-rimini-fiera": {
      it: "/hotel-vicino-rimini-fiera",
      en: "/hotel-near-rimini-fiera",
      de: "/hotel-nahe-rimini-fiera",
    },
    "/privacy-policy": "/privacy-policy",
    "/cookie-policy": "/cookie-policy",
    "/politiche-alberghiere": {
      it: "/politiche-alberghiere",
      en: "/hotel-policies",
      de: "/hotelrichtlinien",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
