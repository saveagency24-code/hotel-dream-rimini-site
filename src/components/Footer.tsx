"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { trackConversion } from "@/lib/analytics";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const [email, setEmail] = useState("");
  const primaryEmail = "onlyyoumisahotel@gmail.com";
  const ccEmail = "saveagency24@gmail.com";

  function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    const query = new URLSearchParams({
      bcc: ccEmail,
      subject: "Iscrizione newsletter dal sito Hotel Dream",
      body: `Email iscrizione newsletter: ${email.trim()}`,
    }).toString();

    trackConversion("newsletter_submit", { source: "footer_newsletter" });
    window.location.href = `mailto:${primaryEmail}?${query}`;
  }

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">

          {/* Column 1: Logo + Nav links */}
          <div>
            <Link href="/" className="inline-block mb-8" aria-label={nav("home")}>
              <Image
                src="/images/logo-v3.png"
                alt=""
                width={160}
                height={64}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <ul className="space-y-3 mb-8">
              {[
                { key: "hotel", href: "/hotel" as const },
                { key: "rooms", href: "/camere" as const },
                { key: "services", href: "/servizi" as const },
                { key: "offers", href: "/offerte" as const },
                { key: "contacts", href: "/contatti" as const },
              ].map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-white/60 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Facebook", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "Whatsapp", href: "https://wa.me/393339299408" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 text-white/60 text-[11px] uppercase tracking-[0.15em] font-body px-5 py-2.5 hover:border-gold hover:text-gold transition-all duration-300"
                  onClick={() => {
                    if (label.toLowerCase() === "whatsapp") {
                      trackConversion("click_whatsapp", { source: "footer_social" });
                    }
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Newsletter */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold mb-6 font-body">
              {t("newsletter")}
            </h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 bg-transparent border border-white/30 text-white text-sm py-2.5 px-4 focus:outline-none focus:border-gold placeholder:text-white/30 transition-colors"
              />
              <button
                type="submit"
                className="border border-gold text-gold text-[11px] uppercase tracking-[0.15em] font-body px-5 py-2.5 hover:bg-gold hover:text-navy transition-all duration-300 shrink-0"
              >
                Iscriviti
              </button>
            </form>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="mt-1 accent-gold" />
              <span className="text-white/40 text-xs leading-relaxed">
                Ho preso visione della{" "}
                <span className="underline text-white/60 hover:text-gold transition-colors cursor-pointer">
                  privacy policy
                </span>
              </span>
            </label>

            <div className="mt-10 text-white/30 text-xs leading-relaxed">
            </div>
          </div>

          {/* Column 3: Address + Contacts */}
          <div>
            <div className="mb-8">
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4 font-body">
                Indirizzo
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Viale Tirrenia, 10<br />
                47924 Miramare<br />
                Rimini (RN)
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4 font-body">
                Contatti
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${primaryEmail}`}
                    className="text-white/60 text-sm hover:text-gold transition-colors duration-300"
                    onClick={() => trackConversion("click_email", { source: "footer_contacts" })}
                  >
                    {primaryEmail}
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+393339299408"
                    className="text-white/60 text-sm hover:text-gold transition-colors duration-300"
                    onClick={() => trackConversion("click_phone", { source: "footer_contacts" })}
                  >
                    +39 333 929 9408
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Codes */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <p className="text-white/40 text-[11px] tracking-wider font-body">
            Codice CIR: <span className="text-white/60">099014-AL-01101</span>
          </p>
          <span className="hidden sm:inline text-white/20">|</span>
          <p className="text-white/40 text-[11px] tracking-wider font-body">
            Codice CIN: <span className="text-white/60">IT099014A1FA6VZQ3Z</span>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-[11px] tracking-wider">
            &copy; {new Date().getFullYear()} {t("hotelName")}. {t("rights")}. | WEB AGENCY{" "}
            <a
              href="https://www.saveagency.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-gold transition-colors"
            >
              SAVE AGENCY
            </a>
          </p>
          <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase">
            <Link href="/politiche-alberghiere" className="text-white/30 hover:text-white/60 transition-colors">
              {t("privacy")}
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/cookie-policy" className="text-white/30 hover:text-white/60 transition-colors">
              {t("cookie")}
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/privacy-policy" className="text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
