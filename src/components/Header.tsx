"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { useState, useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

const navItems = [
  { key: "offers", href: "/offerte" as const },
  { key: "hotel", href: "/hotel" as const },
  { key: "rooms", href: "/camere" as const },
  { key: "services", href: "/servizi" as const },
  { key: "attractions", href: "/attrazioni" as const },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Fixed Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0 relative z-10">
            <Image
              src="/images/logo-v3.png"
              alt="Hotel Dream Rimini"
              width={160}
              height={64}
              className="h-12 md:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-5 md:gap-7">
            <div className="text-white">
              <LanguageSwitcher />
            </div>

            <Link
              href="/contatti"
              className="hidden md:inline-flex text-white text-[11px] uppercase tracking-[0.2em] font-body border border-white/30 px-5 py-2.5 hover:bg-white hover:text-navy transition-all duration-300"
            >
              {t("requestQuote")}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="relative z-10 text-white p-1 group"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span className="block w-6 h-[1.5px] bg-white group-hover:w-5 transition-all duration-300" />
                <span className="block w-6 h-[1.5px] bg-white transition-all duration-300" />
                <span className="block w-4 h-[1.5px] bg-white group-hover:w-6 transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Menu Overlay (Aria-style layout) */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative h-full grid grid-cols-1 md:grid-cols-2">
          {/* Left visual pane */}
          <div className="hidden md:block relative overflow-hidden">
            <Image src="/images/hotel-esterno-notte.png" alt="" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-navy/45" />
          </div>

          {/* Right menu pane */}
          <div className="relative bg-navy text-white flex flex-col">
            <div className="px-5 md:px-8 pt-5 pb-3 flex items-start justify-between">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src="/images/logo-v3.png"
                  alt="Hotel Dream"
                  width={130}
                  height={52}
                  className="h-10 w-auto object-contain"
                />
              </Link>

              <div className="flex items-start gap-5">
                <div className="text-white/90 text-[11px] uppercase tracking-[0.2em]">
                  <LanguageSwitcher />
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white/90 hover:text-gold transition-colors p-1"
                  aria-label="Close"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <nav className="flex-1 flex flex-col pt-4">
              {[...navItems, { key: "contacts", href: "/contatti" as const }].map(({ key, href }, i) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-8 md:px-12 py-3 border-t border-white/30 font-heading text-[clamp(2rem,4vw,3rem)] uppercase tracking-[0.08em] leading-[1] hover:text-gold transition-colors duration-300 ${
                    i % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {t(key)}
                </Link>
              ))}
              <div className="border-t border-white/30" />
            </nav>

            <div className="grid grid-cols-2 border-t border-white/30">
              <Link
                href="/contatti"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-6 border-r border-white/30 text-center hover:bg-white/5 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mx-auto mb-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 3.75h5A1.75 1.75 0 0116.25 5.5v2.25H7.75V5.5A1.75 1.75 0 019.5 3.75z" />
                </svg>
                <p className="text-white/70 text-[11px] uppercase tracking-[0.2em] font-body mb-2">{t("requestQuote")}</p>
                <p className="font-heading text-[clamp(1.2rem,2vw,1.8rem)] leading-none">Contattaci</p>
              </Link>

              <a
                href="https://wa.me/393339299408"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-6 text-center hover:bg-white/5 transition-colors duration-300"
                onClick={() => trackConversion("click_whatsapp", { source: "header_menu" })}
              >
                <svg className="w-5 h-5 mx-auto mb-2 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.51 0-9.98 4.47-9.98 9.98 0 1.76.46 3.49 1.32 5.02L2 22l5.16-1.35a9.94 9.94 0 0 0 4.88 1.25h.01c5.51 0 9.98-4.47 9.98-9.98S17.55 2 12.04 2zm0 18.1h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.2-.31a8.1 8.1 0 1 1 6.88 3.8zm4.44-6.06c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.24 1.02.38 1.37.49.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                </svg>
                <p className="text-white/70 text-[11px] uppercase tracking-[0.2em] font-body mb-2">WhatsApp</p>
                <p className="font-heading text-[clamp(1.2rem,2vw,1.8rem)] leading-none">+39 333 929 9408</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
