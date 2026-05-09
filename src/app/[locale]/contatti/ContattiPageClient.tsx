"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { trackConversion } from "@/lib/analytics";
import BookingPortalLink from "@/components/BookingPortalLink";

export default function ContattiPageClient() {
  const t = useTranslations("contact");
  const common = useTranslations("common");
  const primaryEmail = "onlyyoumisahotel@gmail.com";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden bg-navy">
        <Image
          src="/images/hotel-esterno-notte.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/60" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 pb-16 w-full">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4 animate-fade-in">
            {t("subtitle")}
          </p>
          <h1 className="font-heading text-white text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] animate-fade-in delay-100">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Prenotazioni — TeamSystem Hospitality */}
      <section className="border-y border-gray-border bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-3">
                {t("bookingKicker")}
              </p>
              <h2 className="font-heading text-navy text-[clamp(1.5rem,3vw,2.25rem)] leading-tight mb-4">
                {t("bookingTitle")}
              </h2>
              <p className="text-gray text-[15px] leading-[1.85]">{t("bookingBody")}</p>
            </div>
            <BookingPortalLink
              source="contact_page_booking_strip"
              className="inline-flex shrink-0 items-center justify-center gap-3 bg-navy text-white text-[11px] uppercase tracking-[0.2em] font-body px-8 py-4 hover:bg-navy/90 transition-colors duration-300"
            >
              {t("bookingCta")}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </BookingPortalLink>
          </div>
        </div>
      </section>

      {/* Info + mappa */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="lg:pt-8">
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {t("findUs")}
              </p>
              <p className="text-gray text-[15px] leading-[1.9] mb-12">{t("findUsText")}</p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <span className="w-8 h-px bg-gold mt-3 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-1 font-body">
                      {t("labelAddress")}
                    </p>
                    <p className="text-navy text-[15px]">{t("address")}</p>
                    <p className="text-gray text-sm">{t("city")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="w-8 h-px bg-gold mt-3 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-1 font-body">
                      {t("labelPhone")}
                    </p>
                    <a
                      href="tel:+393339299408"
                      className="text-navy text-[15px] hover:text-gold transition-colors"
                      onClick={() => trackConversion("click_phone", { source: "contact_page" })}
                    >
                      +39 {t("phone")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="w-8 h-px bg-gold mt-3 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-1 font-body">
                      {t("labelEmail")}
                    </p>
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="text-navy text-[15px] hover:text-gold transition-colors"
                      onClick={() => trackConversion("click_email", { source: "contact_page" })}
                    >
                      {t("email")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="w-8 h-px bg-gold mt-3 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-3 font-body">
                      {t("labelWhatsapp")}
                    </p>
                    <a
                      href="https://wa.me/393339299408"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp — ${common("whatsapp")}`}
                      className="inline-flex items-center justify-center gap-3 rounded-md bg-[#25D366] text-white text-[13px] md:text-[14px] font-body uppercase tracking-[0.18em] px-6 py-3.5 shadow-sm hover:bg-[#20bd5a] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] transition-all duration-300 w-full sm:w-auto"
                      onClick={() => trackConversion("click_whatsapp", { source: "contact_page" })}
                    >
                      <svg
                        className="w-6 h-6 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12.04 2c-5.51 0-9.98 4.47-9.98 9.98 0 1.76.46 3.49 1.32 5.02L2 22l5.16-1.35a9.94 9.94 0 0 0 4.88 1.25h.01c5.51 0 9.98-4.47 9.98-9.98S17.55 2 12.04 2zm0 18.1h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.2-.31a8.1 8.1 0 1 1 6.88 3.8zm4.44-6.06c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.24 1.02.38 1.37.49.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                      </svg>
                      <span>{common("whatsapp")}</span>
                    </a>
                    <p className="text-gray text-sm mt-4 leading-relaxed">{t("whatsappHint")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pt-8">
              <div className="relative aspect-video overflow-hidden border border-gray-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.7!2d12.4167!3d44.0433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cc4e5e5e5e5e5%3A0x0!2sViale+Tirrenia+10%2C+Miramare%2C+Rimini!5e0!3m2!1sit!2sit!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
