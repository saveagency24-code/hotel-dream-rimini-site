import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

/** Host canonico da NEXT_PUBLIC_SITE_URL (es. hoteldreamrimini.com o www...). Evita duplicati SEO tra www e apex. */
function getPreferredHostname(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw).hostname;
    } catch {
      /* ignore */
    }
  }
  return "hoteldreamrimini.com";
}

function shouldSkipHostRedirect(host: string): boolean {
  if (!host) return true;
  if (host === "localhost" || host.startsWith("127.0.0.1")) return true;
  if (host.endsWith(".vercel.app")) return true;
  return false;
}

/** Redirect 301 verso l’unico host canonico se l’utente è su www o apex alternativo. */
function redirectToCanonicalHost(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (shouldSkipHostRedirect(host)) return null;

  const preferred = getPreferredHostname();
  if (host === preferred) return null;

  const stripWww = (h: string) => h.replace(/^www\./, "");
  if (stripWww(host) !== stripWww(preferred)) return null;

  const url = request.nextUrl.clone();
  url.hostname = preferred;
  url.protocol = "https:";
  return NextResponse.redirect(url, 301);
}


function getInternalPathname(pathnameWithoutLocale: string): string | null {
  const normalized = pathnameWithoutLocale || "/";

  for (const [internalPath, localizedPath] of Object.entries(routing.pathnames)) {
    if (typeof localizedPath === "string") {
      if (normalized === internalPath || normalized === localizedPath) {
        return internalPath;
      }
      continue;
    }

    if (normalized === internalPath) return internalPath;

    const matchesLocalized = Object.values(localizedPath).some(
      (candidate) => candidate === normalized
    );

    if (matchesLocalized) return internalPath;
  }

  return null;
}

function getCanonicalPathnameForLocale(internalPath: string, locale: "it" | "en" | "de"): string {
  const localizedPath = routing.pathnames[internalPath as keyof typeof routing.pathnames];

  if (!localizedPath) return internalPath;
  if (typeof localizedPath === "string") return localizedPath;

  return localizedPath[locale] ?? internalPath;
}

export default function middleware(request: NextRequest) {
  const hostRedirect = redirectToCanonicalHost(request);
  if (hostRedirect) return hostRedirect;

  const { pathname, search } = request.nextUrl;
  const match = pathname.match(/^\/(it|en|de)(\/.*)?$/);

  if (match) {
    const locale = match[1] as "it" | "en" | "de";
    const pathnameWithoutLocale = match[2] || "/";
    const internalPath = getInternalPathname(pathnameWithoutLocale);

    if (internalPath) {
      const canonicalPathname = getCanonicalPathnameForLocale(internalPath, locale);

      if (canonicalPathname !== pathnameWithoutLocale) {
        const redirectUrl = new URL(`/${locale}${canonicalPathname}${search}`, request.url);
        return NextResponse.redirect(redirectUrl);
      }

      // Serve localized URLs (e.g. /en/contacts) via internal routes
      // that exist in the app folder (e.g. /en/contatti).
      if (internalPath !== pathnameWithoutLocale) {
        const rewriteUrl = new URL(`/${locale}${internalPath}${search}`, request.url);
        return NextResponse.rewrite(rewriteUrl);
      }
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    "/",
    "/(it|en|de)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
