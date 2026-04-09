"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function ScrollRevealCTA() {
  const t = useTranslations("hero");
  const common = useTranslations("common");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;

    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = windowH / 2;

    const raw = 1 - (sectionCenter - viewportCenter) / (windowH - viewportCenter);
    const clamped = Math.max(0, Math.min(1, raw));

    setProgress(clamped);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const maxInset = 18;
  const clipInset = maxInset * (1 - progress);
  const clipRadius = clipInset * 1.2;
  const scale = 1 + (1 - progress) * 0.08;
  const contentOpacity = Math.max(0, (progress - 0.5) / 0.5);

  return (
    <section ref={sectionRef} className="relative mb-0 mt-0">
      <div
        className="relative overflow-hidden"
        style={{
          clipPath: `inset(${clipInset}% ${clipInset}% ${clipInset}% ${clipInset}% round ${clipRadius}px)`,
          willChange: "clip-path",
        }}
      >
        <div
          className="relative h-[70vh] md:h-[85vh] flex items-center justify-center"
          style={{
            transform: `scale(${scale})`,
            willChange: "transform",
          }}
        >
          <Image
            src="/images/hotel-esterno-notte.png"
            alt="Hotel Dream Rimini"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/50 to-navy/30" />

          <div
            className="relative z-10 text-center px-5 max-w-3xl mx-auto"
            style={{
              opacity: contentOpacity,
              transform: `translateY(${(1 - contentOpacity) * 40}px)`,
              willChange: "opacity, transform",
            }}
          >
            <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-5">
              {t("tagline")}
            </p>
            <h2 className="font-heading text-white text-[clamp(2rem,6vw,4.5rem)] leading-[1] mb-3">
              {t("welcome")}
            </h2>
            <h3 className="font-heading text-white text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] mb-10">
              {t("hotelName")}
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contatti"
                className="border border-gold text-gold text-[11px] uppercase tracking-[0.2em] font-body px-8 py-3.5 hover:bg-gold hover:text-navy transition-all duration-300"
              >
                {common("bookNow")}
              </Link>
              <a
                href="https://wa.me/393339299408"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white text-[11px] uppercase tracking-[0.2em] font-body px-8 py-3.5 hover:bg-white hover:text-navy transition-all duration-300"
              >
                {common("whatsapp")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
