import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("hero");
  const home = useTranslations("home");
  const rooms = useTranslations("rooms");
  const services = useTranslations("services");
  const offers = useTranslations("offers");
  const common = useTranslations("common");

  const roomTypes = [
    { key: "single", count: "4", img: "/images/placeholder-room.jpg" },
    { key: "double", count: "14", img: "/images/placeholder-room.jpg" },
    { key: "suite", count: "2", img: "/images/placeholder-room.jpg" },
    { key: "triple", count: "5", img: "/images/placeholder-room.jpg" },
    { key: "family", count: "2", img: "/images/placeholder-room.jpg" },
  ] as const;

  const serviceItems = [
    { key: "breakfastTitle", icon: BreakfastIcon },
    { key: "barTitle", icon: BarIcon },
    { key: "solariumTitle", icon: SunIcon },
    { key: "parkingTitle", icon: ParkingIcon },
  ] as const;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy/60 to-navy/90 z-10" />
        <div className="absolute inset-0 bg-[url('/images/placeholder-hero.jpg')] bg-cover bg-center opacity-40" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-body animate-fade-in">
            {t("welcome")}
          </p>
          <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-8xl mb-4 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            {t("hotelName")}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <span className="w-12 h-px bg-gold" />
            <p className="text-turquoise text-sm md:text-base uppercase tracking-widest font-body">
              {t("location")}
            </p>
            <span className="w-12 h-px bg-gold" />
          </div>
          <p className="text-white/80 text-lg md:text-xl mb-2 font-body animate-fade-in" style={{ animationDelay: "0.45s" }}>
            {t("tagline")}
          </p>
          <p className="text-white/60 text-sm mb-10 font-body animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.75s" }}>
            <Link
              href="/camere"
              className="bg-gold text-navy px-8 py-3 text-sm uppercase tracking-wider font-body hover:bg-gold-dark transition-colors"
            >
              {t("cta")}
            </Link>
            <Link
              href="/contatti"
              className="border border-white text-white px-8 py-3 text-sm uppercase tracking-wider font-body hover:bg-white hover:text-navy transition-all"
            >
              {t("ctaBook")}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-navy text-3xl md:text-4xl lg:text-5xl mb-8">
            {home("introTitle")}
          </h2>
          <p className="text-gray text-base md:text-lg leading-relaxed mb-6">
            {home("introText")}
          </p>
          <p className="text-navy font-body font-semibold text-lg">
            {home("introHighlight")}
          </p>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="py-20 lg:py-28 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-navy text-3xl md:text-4xl lg:text-5xl mb-4">
              {home("roomsTitle")}
            </h2>
            <p className="text-gray text-base md:text-lg">
              {home("roomsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomTypes.map(({ key, count }) => (
              <Link
                key={key}
                href="/camere"
                className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 bg-navy/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent z-10" />
                  <div className="absolute inset-0 bg-navy/20 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 z-20 bg-gold/90 text-navy text-xs px-3 py-1 uppercase tracking-wider font-body">
                    {count}x
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-navy text-xl mb-2">
                    {rooms(key)}
                  </h3>
                  <p className="text-gray text-sm line-clamp-2">
                    {rooms(`${key}Desc`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-turquoise text-sm mt-4 group-hover:gap-2 transition-all">
                    {common("readMore")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES RIBBON */}
      <section className="py-20 lg:py-28 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-2 font-body">{home("servicesTitle")}</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-2">{home("servicesTitle2")}</h2>
            <p className="text-turquoise uppercase tracking-[0.3em] text-sm font-body">{home("servicesTitle3")}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceItems.map(({ key, icon: Icon }) => (
              <div key={key} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon />
                </div>
                <h3 className="font-heading text-lg uppercase tracking-wider text-gold">
                  {services(key)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-navy text-3xl md:text-4xl lg:text-5xl mb-4">
              {home("offersTitle")}
            </h2>
            <p className="text-gray text-base md:text-lg">
              {home("offersSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cosmoprof */}
            <div className="border border-gray-border p-8 hover:border-gold transition-colors group">
              <span className="text-xs uppercase tracking-wider text-turquoise font-body">
                {offers("from")} €49 {offers("perNight")}
              </span>
              <h3 className="font-heading text-navy text-2xl mt-3 mb-4">
                {offers("cosmoprof")}
              </h3>
              <p className="text-gray text-sm mb-4">{offers("cosmoprofDesc")}</p>
              <ul className="space-y-1 text-sm text-navy mb-6">
                <li>• {offers("cosmoprofSingle")}</li>
                <li>• {offers("cosmoprofDouble")}</li>
                <li className="text-gray">{offers("cosmoprofIncludes")}</li>
              </ul>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 text-gold text-sm uppercase tracking-wider group-hover:gap-3 transition-all"
              >
                {offers("bookNow")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Weekend */}
            <div className="border border-gray-border p-8 hover:border-gold transition-colors group">
              <span className="text-xs uppercase tracking-wider text-turquoise font-body">
                {offers("weekendPrice")}
              </span>
              <h3 className="font-heading text-navy text-2xl mt-3 mb-4">
                {offers("weekend")}
              </h3>
              <p className="text-gray text-sm mb-4">{offers("weekendDesc")}</p>
              <p className="text-sm text-navy mb-6">{offers("weekendIncludes")}</p>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 text-gold text-sm uppercase tracking-wider group-hover:gap-3 transition-all"
              >
                {offers("bookNow")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-navy-dark transition-colors"
            >
              {home("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-16 bg-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-navy text-3xl md:text-4xl mb-6">
            {t("hotelName")}
          </h2>
          <p className="text-navy/70 mb-8 font-body">{t("tagline")} · {t("subtitle")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contatti"
              className="bg-navy text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-navy-dark transition-colors"
            >
              {common("bookNow")}
            </Link>
            <a
              href="https://wa.me/393339299408"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-navy text-navy px-8 py-3 text-sm uppercase tracking-wider hover:bg-navy hover:text-white transition-all"
            >
              {common("whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function BreakfastIcon() {
  return (
    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4zM4 16h16M6 20h12" />
    </svg>
  );
}

function BarIcon() {
  return (
    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 2l3 7 3-7M9 9h6M12 9v11M8 20h8" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h4a2 2 0 012 2v0a2 2 0 01-2 2H9V7zM9 11v6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
    </svg>
  );
}
