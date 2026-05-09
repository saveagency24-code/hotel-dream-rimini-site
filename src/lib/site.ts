export const SITE_NAME = "Hotel Dream Rimini";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://hoteldreamrimini.com";

/** Hostname canonico (senza schema), utile per robots Host e link assoluti interni se serve. */
export function getSiteHostname(): string {
  try {
    return new URL(SITE_URL).hostname;
  } catch {
    return "hoteldreamrimini.com";
  }
}

/** Motore di prenotazione TeamSystem Hospitality (hotel-dream). Override con NEXT_PUBLIC_BOOKING_URL se necessario. */
const DEFAULT_BOOKING_PORTAL_URL =
  "https://hospitality-guest.teamsystem.cloud/booking-engine/hotel-dream";

export const BOOKING_PORTAL_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || DEFAULT_BOOKING_PORTAL_URL;

export const DEFAULT_LOCALE = "it";
export const LOCALES = ["it", "en", "de"] as const;

export type Locale = (typeof LOCALES)[number];
