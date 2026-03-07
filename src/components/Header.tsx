"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  { key: "offers", href: "/offerte" as const },
  { key: "hotel", href: "/hotel" as const },
  { key: "rooms", href: "/camere" as const },
  { key: "breakfast", href: "/colazione" as const },
  { key: "bar", href: "/bar" as const },
  { key: "services", href: "/servizi" as const },
  { key: "parking", href: "/parcheggio" as const },
  { key: "attractions", href: "/attrazioni" as const },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Hotel Dream Rimini"
              width={120}
              height={50}
              className="h-10 w-auto lg:h-12"
              priority
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="text-white/90 text-sm font-body uppercase tracking-wider hover:text-gold transition-colors"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-white">
              <LanguageSwitcher />
            </div>

            <Link
              href="/contatti"
              className="hidden md:inline-flex items-center gap-2 border border-gold text-gold px-5 py-2 text-sm uppercase tracking-wider hover:bg-gold hover:text-navy transition-all"
            >
              {t("requestQuote")}
            </Link>

            <a
              href="tel:+393339299408"
              className="hidden lg:inline-flex items-center gap-2 text-white text-sm hover:text-gold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t("callUs")}
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden text-white p-2"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-navy flex flex-col">
          <div className="flex items-center justify-between px-6 py-5">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/images/logo.png"
                alt="Hotel Dream"
                width={120}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-6">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-xl font-heading uppercase tracking-widest hover:text-gold transition-colors"
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href="/contatti"
              onClick={() => setMobileOpen(false)}
              className="text-white text-xl font-heading uppercase tracking-widest hover:text-gold transition-colors"
            >
              {t("contacts")}
            </Link>
          </nav>

          <div className="px-6 py-8 flex flex-col items-center gap-4">
            <a
              href="tel:+393339299408"
              className="text-gold text-lg"
            >
              +39 333 929 9408
            </a>
            <div className="text-white">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
