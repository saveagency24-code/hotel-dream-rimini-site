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
    "/colazione": {
      it: "/colazione",
      en: "/breakfast",
      de: "/fruehstueck",
    },
    "/bar": "/bar",
    "/servizi": {
      it: "/servizi",
      en: "/services",
      de: "/services",
    },
    "/parcheggio": {
      it: "/parcheggio",
      en: "/parking",
      de: "/parkplatz",
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
  },
});

export type Pathnames = keyof typeof routing.pathnames;
