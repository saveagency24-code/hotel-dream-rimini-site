import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { getBreadcrumbSchema, getServicesFaqSchema } from "@/lib/geo";
import { SITE_URL } from "@/lib/site";
import { seoForPath } from "@/lib/seo-metadata";
import ServicePhotoCarousel from "@/components/ServicePhotoCarousel";

type Props = { params: Promise<{ locale: string }> };

const BREAKFAST_GALLERY_SRC = [
  "/images/servizi/colazione/hotel-dream-rimini-servizi-colazione-01.jpg",
  "/images/servizi/colazione/hotel-dream-rimini-servizi-colazione-02.jpg",
  "/images/servizi/colazione/hotel-dream-rimini-servizi-colazione-03.jpg",
];

const BAR_GALLERY_SRC = Array.from({ length: 15 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/images/servizi/bar/hotel-dream-rimini-bar-interno-${n}.jpg`;
});

const SOLARIUM_GALLERY_SRC = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/images/servizi/solarium/hotel-dream-rimini-servizi-solarium-${n}.jpg`;
});

const KIDS_GALLERY_SRC = [
  "/images/servizi/sala-bimbi/hotel-dream-rimini-servizi-sala-bimbi-01.jpg",
  "/images/servizi/sala-bimbi/hotel-dream-rimini-servizi-sala-bimbi-02.jpg",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.servicesTitle,
    description: messages.meta.servicesDesc,
    ...seoForPath("/servizi", locale),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent locale={locale} />;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  breakfastTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5h18M6 13.5V6a1 1 0 011-1h4a1 1 0 011 1v7.5M9 19.5v-6M15 8h2a2 2 0 012 2v3.5M15 19.5v-8" />
    </svg>
  ),
  barTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.3 24.3 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.096.04A2.25 2.25 0 0117.25 13.5h.008M14.25 3.104c.251.023.501.05.75.082M5 14.5h14M5 14.5l-.75 5.25h15.5L19 14.5" />
    </svg>
  ),
  solariumTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  kidsAreaTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
  ),
  parkingTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  wifiTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  ),
  beachTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0v9m0 0l6-3.5M12 12L6 8.5" />
    </svg>
  ),
  cleaningTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  acTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
    </svg>
  ),
  tvTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  bikesTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 6.75a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm7.5 0a3.375 3.375 0 106.75 0 3.375 3.375 0 00-6.75 0zM8.25 6.75l2.25 9m1.5-9l1.5 6 1.5-3" />
    </svg>
  ),
  restaurantsTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
    </svg>
  ),
  receptionTitle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
};

function ServicesContent({ locale }: { locale: string }) {
  const t = useTranslations("services");
  const breakfast = useTranslations("breakfast");
  const bar = useTranslations("bar");
  const solariumSection = useTranslations("solarium");
  const kidsRoom = useTranslations("kidsRoom");
  const common = useTranslations("common");

  const allServices = [
    { title: "breakfastTitle" as const, desc: "breakfastDesc" as const },
    { title: "barTitle" as const, desc: "barDesc" as const },
    { title: "solariumTitle" as const, desc: "solariumDesc" as const },
    { title: "kidsAreaTitle" as const, desc: "kidsAreaDesc" as const },
    { title: "parkingTitle" as const, desc: "parkingDesc" as const },
    { title: "wifiTitle" as const, desc: "wifiDesc" as const },
    { title: "beachTitle" as const, desc: "beachDesc" as const },
    { title: "cleaningTitle" as const, desc: "cleaningDesc" as const },
    { title: "acTitle" as const, desc: "acDesc" as const },
    { title: "tvTitle" as const, desc: "tvDesc" as const },
    { title: "bikesTitle" as const, desc: "bikesDesc" as const },
    { title: "restaurantsTitle" as const, desc: "restaurantsDesc" as const },
    { title: "receptionTitle" as const, desc: "receptionDesc" as const },
  ];

  const featuredServices = [
    { anchor: "colazione", labelKey: "breakfastTitle" as const },
    { anchor: "bar", labelKey: "barTitle" as const },
    { anchor: "solarium", labelKey: "solariumTitle" as const },
    { anchor: "sala-bimbi", labelKey: "kidsAreaTitle" as const },
  ];

  const breakfastCarouselImages = BREAKFAST_GALLERY_SRC.map((src, i) => ({
    src,
    alt: `${breakfast("title")} — ${i + 1}`,
  }));

  const barCarouselImages = BAR_GALLERY_SRC.map((src, i) => ({
    src,
    alt: `${bar("title")} — ${i + 1}`,
  }));

  const solariumCarouselImages = SOLARIUM_GALLERY_SRC.map((src, i) => ({
    src,
    alt: `${solariumSection("title")} — ${i + 1}`,
  }));

  const kidsCarouselImages = KIDS_GALLERY_SRC.map((src, i) => ({
    src,
    alt: `${kidsRoom("title")} — ${i + 1}`,
  }));

  const breakfastCategories = [
    { key: "sweet" as const, items: "sweetItems" as const },
    { key: "savory" as const, items: "savoryItems" as const },
    { key: "drinks" as const, items: "drinksItems" as const },
    { key: "fresh" as const, items: "freshItems" as const },
  ];

  const barItems = [
    { key: "aperitivo" as const, icon: "🍹" },
    { key: "drinks" as const, icon: "🥂" },
    { key: "coffee" as const, icon: "☕" },
    { key: "snacks" as const, icon: "🍕" },
  ];

  const faqPairs = [
    ["faq1Question", "faq1Answer"],
    ["faq2Question", "faq2Answer"],
    ["faq3Question", "faq3Answer"],
    ["faq4Question", "faq4Answer"],
    ["faq5Question", "faq5Answer"],
    ["faq6Question", "faq6Answer"],
    ["faq7Question", "faq7Answer"],
    ["faq8Question", "faq8Answer"],
    ["faq9Question", "faq9Answer"],
    ["faq10Question", "faq10Answer"],
    ["faq11Question", "faq11Answer"],
    ["faq12Question", "faq12Answer"],
  ] as const;

  return (
    <>
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Servizi", url: `${SITE_URL}/${locale}/servizi` },
        ])}
      />
      <StructuredData data={getServicesFaqSchema()} />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden bg-navy">
        <Image
          src="/images/servizi-1.jpg"
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

      {/* Anchor nav sezioni principali */}
      <nav className="bg-white border-b border-gray-border sticky top-0 z-30 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <ul className="flex items-center gap-8 h-14">
            {featuredServices.map(({ anchor, labelKey }) => (
              <li key={anchor}>
                <a
                  href={`#${anchor}`}
                  className="text-[11px] uppercase tracking-[0.2em] font-body text-navy/60 hover:text-gold transition-colors duration-200 py-4 border-b-2 border-transparent hover:border-gold"
                >
                  {t(labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Services icon grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">{t("subtitle")}</p>
            <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.08em] leading-tight">
              {t("allServicesTitle") ?? "I Nostri Servizi"}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-gray-border border border-gray-border">
            {allServices.map(({ title, desc }) => (
              <div
                key={title}
                className="group bg-white p-7 md:p-8 flex flex-col gap-4 hover:bg-navy transition-colors duration-400 cursor-default"
              >
                <span className="text-gold group-hover:text-gold/90 transition-colors duration-400">
                  {SERVICE_ICONS[title]}
                </span>
                <div>
                  <h3 className="font-heading text-navy text-base uppercase tracking-[0.12em] mb-1.5 group-hover:text-white transition-colors duration-400">
                    {t(title)}
                  </h3>
                  <p className="text-gray text-[13px] leading-[1.7] group-hover:text-white/55 transition-colors duration-400">
                    {t(desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisore decorativo */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Colazione */}
      <section id="colazione" className="scroll-mt-14 py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            {/* Foto principale */}
            <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
              <Image
                src={BREAKFAST_GALLERY_SRC[0]}
                alt={breakfast("title")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Testo */}
            <div>
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {breakfast("subtitle")}
              </p>
              <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.08em] mb-6 leading-tight">
                {breakfast("title")}
              </h2>
              <p className="text-gray text-[15px] leading-[1.9] mb-4">{breakfast("description")}</p>
              <p className="text-gray text-[15px] leading-[1.9] mb-10">{breakfast("description2")}</p>
              <div className="space-y-5">
                {breakfastCategories.map(({ key, items }) => (
                  <div key={key} className="flex gap-5">
                    <div className="w-px bg-gold shrink-0" />
                    <div>
                      <h3 className="font-heading text-navy text-sm uppercase tracking-[0.15em] mb-1">
                        {breakfast(key)}
                      </h3>
                      <p className="text-gray text-[13px] leading-relaxed">{breakfast(items)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Galleria colazione */}
          <div className="-mx-1">
            <ServicePhotoCarousel
              images={breakfastCarouselImages}
              prevLabel={common("carouselPrev")}
              nextLabel={common("carouselNext")}
            />
          </div>
        </div>
      </section>

      {/* Divisore */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Bar */}
      <section id="bar" className="scroll-mt-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            {/* Testo — invertito */}
            <div className="lg:order-1 order-2">
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {bar("subtitle")}
              </p>
              <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.08em] mb-6 leading-tight">
                {bar("title")}
              </h2>
              <p className="text-gray text-[15px] leading-[1.9] mb-4">{bar("description")}</p>
              <p className="text-gray text-[15px] leading-[1.9] mb-10">{bar("description2")}</p>
              <div className="grid grid-cols-2 gap-3">
                {barItems.map(({ key, icon }) => (
                  <div
                    key={key}
                    className="border border-gray-border p-5 flex items-center gap-3 hover:border-gold/50 transition-colors duration-300"
                  >
                    <span className="text-xl shrink-0">{icon}</span>
                    <span className="font-heading text-navy text-sm uppercase tracking-[0.12em]">
                      {bar(key)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Foto — invertita */}
            <div className="lg:order-2 order-1 relative aspect-[4/3] overflow-hidden bg-navy/5">
              <Image
                src="/images/servizi/bar/hotel-dream-rimini-bar-interno-04.jpg"
                alt={bar("title")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="-mx-1">
            <ServicePhotoCarousel
              images={barCarouselImages}
              prevLabel={common("carouselPrev")}
              nextLabel={common("carouselNext")}
            />
          </div>
        </div>
      </section>

      {/* Divisore */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Solarium */}
      <section id="solarium" className="scroll-mt-14 py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
              <Image
                src="/images/servizi/solarium/hotel-dream-rimini-servizi-solarium-01.jpg"
                alt={solariumSection("title")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {solariumSection("subtitle")}
              </p>
              <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.08em] mb-6 leading-tight">
                {solariumSection("title")}
              </h2>
              <p className="text-gray text-[15px] leading-[1.9] mb-4">{solariumSection("description")}</p>
              <p className="text-gray text-[15px] leading-[1.9]">{solariumSection("description2")}</p>
            </div>
          </div>
          <div className="-mx-1">
            <ServicePhotoCarousel
              images={solariumCarouselImages}
              prevLabel={common("carouselPrev")}
              nextLabel={common("carouselNext")}
            />
          </div>
        </div>
      </section>

      {/* Divisore */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Sala bimbi */}
      <section id="sala-bimbi" className="scroll-mt-14 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            <div className="lg:order-1 order-2">
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {kidsRoom("subtitle")}
              </p>
              <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.08em] mb-6 leading-tight">
                {kidsRoom("title")}
              </h2>
              <p className="text-gray text-[15px] leading-[1.9] mb-4">{kidsRoom("description")}</p>
              <p className="text-gray text-[15px] leading-[1.9]">{kidsRoom("description2")}</p>
            </div>
            <div className="lg:order-2 order-1 relative aspect-[4/3] overflow-hidden bg-navy/5">
              <Image
                src="/images/servizi/sala-bimbi/hotel-dream-rimini-servizi-sala-bimbi-01.jpg"
                alt={kidsRoom("title")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="-mx-1">
            <ServicePhotoCarousel
              images={kidsCarouselImages}
              prevLabel={common("carouselPrev")}
              nextLabel={common("carouselNext")}
            />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 lg:py-20 bg-navy">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-2">
              {t("partnersSubtitle")}
            </p>
            <h2 className="font-heading text-white text-2xl md:text-3xl uppercase tracking-[0.08em]">
              {t("partners")}
            </h2>
          </div>
          <div className="border border-white/15 px-8 py-5 hover:border-gold/40 transition-colors duration-300">
            <p className="font-heading text-white text-sm text-center">{t("purograno")}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-20">
            <div>
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">FAQ</p>
              <h2 className="font-heading text-navy text-3xl md:text-[2.5rem] uppercase tracking-[0.08em] leading-tight">
                {t("faqSectionTitle")}
              </h2>
            </div>
            <div className="divide-y divide-navy/10 border-t border-navy/10">
              {faqPairs.map(([qKey, aKey]) => (
                <details key={qKey} className="group faq-details">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-navy text-base md:text-lg outline-none transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 rounded-sm [&::-webkit-details-marker]:hidden">
                    <span>{t(qKey)}</span>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center border border-navy/15 text-gold transition-transform duration-300 group-open:rotate-180"
                      aria-hidden
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pl-0 pb-5 pt-1 text-gray text-[14px] leading-[1.85] border-l-2 border-gold/60 pl-5 ml-0.5">
                    {t(aKey)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
