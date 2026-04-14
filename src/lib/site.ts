export const SITE_NAME = "Hotel Dream Rimini";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://hoteldreamrimini.com";

export const DEFAULT_LOCALE = "it";
export const LOCALES = ["it", "en", "de"] as const;

export type Locale = (typeof LOCALES)[number];
