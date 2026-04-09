"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Pathnames } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const flagMap: Record<string, string> = {
  it: "IT",
  en: "EN",
  de: "DE",
};

type Locale = (typeof routing.locales)[number];

function toInternalPathname(currentPathname: string): Pathnames {
  const withoutLocale = currentPathname.replace(/^\/(it|en|de)(?=\/|$)/, "") || "/";

  for (const [internalPath, localizedPath] of Object.entries(routing.pathnames)) {
    if (typeof localizedPath === "string") {
      if (withoutLocale === localizedPath || withoutLocale === internalPath) {
        return internalPath as Pathnames;
      }
      continue;
    }

    if (withoutLocale === internalPath) return internalPath as Pathnames;

    const matchesLocalized = Object.values(localizedPath).some(
      (candidate) => candidate === withoutLocale
    );

    if (matchesLocalized) return internalPath as Pathnames;
  }

  return "/";
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    const sourcePathname =
      typeof window !== "undefined" ? window.location.pathname : pathname;
    const internalPathname = toInternalPathname(sourcePathname);

    router.replace(internalPathname, { locale: newLocale as Locale });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm font-body tracking-wide hover:text-gold transition-colors"
        aria-label="Switch language"
      >
        <span>{flagMap[locale]}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-border py-1 min-w-[100px] z-50">
          {routing.locales
            .filter((l) => l !== locale)
            .map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className="w-full text-left px-4 py-2 text-sm text-navy border-l-2 border-transparent hover:border-gold hover:bg-white transition-colors"
              >
                {flagMap[l]}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
