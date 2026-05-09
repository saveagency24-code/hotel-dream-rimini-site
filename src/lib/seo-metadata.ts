import type { Metadata } from "next";
import { getLocalizedPath } from "@/lib/routing-paths";
import { LOCALES, SITE_URL, type Locale } from "@/lib/site";

/**
 * Canonical per la pagina corrente + hreflang (it/en/de + x-default → IT).
 * Il redirect www/apex nel middleware evita duplicati tra host; qui evitiamo duplicati tra URL di pagina.
 */
export function seoForPath(internalPath: string, locale: string): Pick<Metadata, "alternates" | "openGraph"> {
  const loc = locale as Locale;
  const path = getLocalizedPath(internalPath, loc);
  const abs = `${SITE_URL}${path}`;

  const languages: Record<string, string> = {
    ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${getLocalizedPath(internalPath, l)}`])),
    "x-default": `${SITE_URL}${getLocalizedPath(internalPath, "it")}`,
  };

  return {
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      url: abs,
    },
  };
}
