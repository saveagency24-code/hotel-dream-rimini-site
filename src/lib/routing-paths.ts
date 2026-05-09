import { routing } from "@/i18n/routing";
import { type Locale } from "@/lib/site";

/**
 * Percorso URL localizzato (es. /it/camere, /en/rooms) per una route interna next-intl.
 * Usato da sitemap, canonical e hreflang.
 */
export function getLocalizedPath(pathname: string, locale: Locale): string {
  if (pathname === "/") {
    return `/${locale}`;
  }

  const mapping = routing.pathnames[pathname as keyof typeof routing.pathnames];

  if (!mapping) return `/${locale}${pathname}`;
  if (typeof mapping === "string") return `/${locale}${mapping}`;

  return `/${locale}${mapping[locale] ?? pathname}`;
}
