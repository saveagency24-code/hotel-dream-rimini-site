"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { trackConversion } from "@/lib/analytics";

export default function ContactsPage() {
  const t = useTranslations("contact");
  const common = useTranslations("common");
  const primaryEmail = "onlyyoumisahotel@gmail.com";
  const ccEmail = "saveagency24@gmail.com";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: "2",
    message: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = [
      `Nome: ${formData.name}`,
      `Email: ${formData.email}`,
      `Telefono: ${formData.phone || "-"}`,
      `Check-in: ${formData.checkin || "-"}`,
      `Check-out: ${formData.checkout || "-"}`,
      `Ospiti: ${formData.guests || "-"}`,
      "",
      "Messaggio:",
      formData.message || "-",
    ].join("\n");

    const query = new URLSearchParams({
      bcc: ccEmail,
      subject: "Richiesta contatto dal sito Hotel Dream",
      body,
    }).toString();

    trackConversion("lead_form_submit", {
      source: "contact_page_form",
      guests: formData.guests,
    });

    window.location.href = `mailto:${primaryEmail}?${query}`;
  }

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

      {/* Content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {t("formTitle")}
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-2 font-body">
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full border-b border-gray-border bg-transparent px-0 py-3 text-navy text-[15px] focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-2 font-body">
                      {t("emailField")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full border-b border-gray-border bg-transparent px-0 py-3 text-navy text-[15px] focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-2 font-body">
                      {t("phoneField")}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full border-b border-gray-border bg-transparent px-0 py-3 text-navy text-[15px] focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-2 font-body">
                      {t("checkin")}
                    </label>
                    <input
                      type="date"
                      value={formData.checkin}
                      onChange={(e) => setFormData((prev) => ({ ...prev, checkin: e.target.value }))}
                      className="w-full border-b border-gray-border bg-transparent px-0 py-3 text-navy text-[15px] focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-2 font-body">
                      {t("checkout")}
                    </label>
                    <input
                      type="date"
                      value={formData.checkout}
                      onChange={(e) => setFormData((prev) => ({ ...prev, checkout: e.target.value }))}
                      className="w-full border-b border-gray-border bg-transparent px-0 py-3 text-navy text-[15px] focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-2 font-body">
                      {t("guests")}
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData((prev) => ({ ...prev, guests: e.target.value }))}
                      className="w-full border-b border-gray-border bg-transparent px-0 py-3 text-navy text-[15px] focus:border-gold focus:outline-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-2 font-body">
                    {t("message")}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full border-b border-gray-border bg-transparent px-0 py-3 text-navy text-[15px] focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-gold text-navy text-[11px] uppercase tracking-[0.2em] font-body px-8 py-3.5 hover:bg-gold-dark transition-colors duration-300 mt-4"
                >
                  {t("send")}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Info column */}
            <div className="lg:pt-8">
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {t("findUs")}
              </p>
              <p className="text-gray text-[15px] leading-[1.9] mb-12">{t("findUsText")}</p>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-5">
                  <span className="w-8 h-px bg-gold mt-3 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-1 font-body">Indirizzo</p>
                    <p className="text-navy text-[15px]">{t("address")}</p>
                    <p className="text-gray text-sm">{t("city")}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <span className="w-8 h-px bg-gold mt-3 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-1 font-body">Telefono</p>
                    <a
                      href="tel:+393339299408"
                      className="text-navy text-[15px] hover:text-gold transition-colors"
                      onClick={() => trackConversion("click_phone", { source: "contact_page" })}
                    >
                      +39 {t("phone")}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <span className="w-8 h-px bg-gold mt-3 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-1 font-body">Email</p>
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="text-navy text-[15px] hover:text-gold transition-colors"
                      onClick={() => trackConversion("click_email", { source: "contact_page" })}
                    >
                      {t("email")}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-5">
                  <span className="w-8 h-px bg-gold mt-3 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy/60 mb-1 font-body">WhatsApp</p>
                    <a
                      href="https://wa.me/393339299408"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy text-[15px] hover:text-gold transition-colors"
                      onClick={() => trackConversion("click_whatsapp", { source: "contact_page" })}
                    >
                      {common("whatsapp")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12 relative aspect-video overflow-hidden border border-gray-border">
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
