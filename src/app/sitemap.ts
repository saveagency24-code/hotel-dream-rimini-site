import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getLocalizedPath } from "@/lib/routing-paths";
import { LOCALES, SITE_URL, type Locale } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const internalPaths = Object.keys(routing.pathnames);

  return internalPaths.map((pathname) => {
    const canonicalLocale: Locale = "it";
    const canonicalPath = getLocalizedPath(pathname, canonicalLocale);

    const languages = Object.fromEntries(
      LOCALES.map((locale) => [locale, `${SITE_URL}${getLocalizedPath(pathname, locale)}`])
    );

    return {
      url: `${SITE_URL}${canonicalPath}`,
      lastModified: new Date(),
      changeFrequency: pathname === "/" ? "daily" : "weekly",
      priority: pathname === "/" ? 1 : 0.7,
      alternates: { languages },
    };
  });
}
