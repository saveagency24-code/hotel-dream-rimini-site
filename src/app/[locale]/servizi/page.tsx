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

function ServicesContent({ locale }: { locale: string }) {
  const t = useTranslations("services");
  const breakfast = useTranslations("breakfast");
  const bar = useTranslations("bar");
  const solariumSection = useTranslations("solarium");
  const kidsRoom = useTranslations("kidsRoom");
  const common = useTranslations("common");

  const allServices = [
    { title: "breakfastTitle" as const, desc: "breakfastDesc" as const, icon: "🍳" },
    { title: "barTitle" as const, desc: "barDesc" as const, icon: "☕" },
    { title: "solariumTitle" as const, desc: "solariumDesc" as const, icon: "☀️" },
    { title: "kidsAreaTitle" as const, desc: "kidsAreaDesc" as const, icon: "🧸" },
    { title: "parkingTitle" as const, desc: "parkingDesc" as const, icon: "🅿️" },
    { title: "wifiTitle" as const, desc: "wifiDesc" as const, icon: "📶" },
    { title: "beachTitle" as const, desc: "beachDesc" as const, icon: "🏖️" },
    { title: "cleaningTitle" as const, desc: "cleaningDesc" as const, icon: "✨" },
    { title: "acTitle" as const, desc: "acDesc" as const, icon: "❄️" },
    { title: "tvTitle" as const, desc: "tvDesc" as const, icon: "📺" },
    { title: "bikesTitle" as const, desc: "bikesDesc" as const, icon: "🚲" },
    { title: "restaurantsTitle" as const, desc: "restaurantsDesc" as const, icon: "🍽️" },
    { title: "receptionTitle" as const, desc: "receptionDesc" as const, icon: "🛎️" },
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

      {/* Services grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map(({ title, desc, icon }) => (
              <div
                key={title}
                className="flex gap-4 md:gap-5 rounded-lg border border-navy/10 bg-white p-8 md:p-10 transition-colors duration-500 hover:border-navy/25 group hover:bg-navy"
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-2xl transition-all duration-500 group-hover:scale-105 group-hover:bg-gold/15"
                  aria-hidden
                >
                  {icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-navy text-lg md:text-xl uppercase tracking-[0.15em] mb-3 group-hover:text-gold transition-colors duration-500">
                    {t(title)}
                  </h3>
                  <p className="text-gray text-sm leading-[1.8] group-hover:text-white/60 transition-colors duration-500">
                    {t(desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breakfast section */}
      <section id="colazione" className="scroll-mt-32 py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl lg:pt-6">
            <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
              {breakfast("subtitle")}
            </p>
            <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.1em] mb-8 leading-tight">
              {breakfast("title")}
            </h2>
            <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-6">{breakfast("description")}</p>
            <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-10">{breakfast("description2")}</p>
          </div>

          <div className="mb-12 -mx-1">
            <ServicePhotoCarousel
              images={breakfastCarouselImages}
              prevLabel={common("carouselPrev")}
              nextLabel={common("carouselNext")}
            />
          </div>

          <div className="max-w-3xl space-y-7">
            {breakfastCategories.map(({ key, items }) => (
              <div key={key} className="border-l-2 border-gold pl-6">
                <h3 className="font-heading text-navy text-lg uppercase tracking-[0.15em] mb-2">
                  {breakfast(key)}
                </h3>
                <p className="text-gray text-sm leading-relaxed">{breakfast(items)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bar section */}
      <section id="bar" className="scroll-mt-32 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
              {bar("subtitle")}
            </p>
            <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.1em] mb-8 leading-tight">
              {bar("title")}
            </h2>
            <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-6">{bar("description")}</p>
            <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-10">{bar("description2")}</p>
          </div>

          <div className="mb-12 -mx-1">
            <ServicePhotoCarousel
              images={barCarouselImages}
              prevLabel={common("carouselPrev")}
              nextLabel={common("carouselNext")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {barItems.map(({ key, icon }) => (
              <div
                key={key}
                className="group border border-navy/10 p-8 md:p-10 text-center hover:bg-navy hover:border-navy transition-all duration-500 cursor-default"
              >
                <span className="block text-4xl mb-5 group-hover:scale-110 transition-transform duration-500">
                  {icon}
                </span>
                <h3 className="font-heading text-navy text-lg uppercase tracking-[0.15em] group-hover:text-gold transition-colors duration-500">
                  {bar(key)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solarium */}
      <section id="solarium" className="scroll-mt-32 py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
              {solariumSection("subtitle")}
            </p>
            <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.1em] mb-8 leading-tight">
              {solariumSection("title")}
            </h2>
            <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-6">{solariumSection("description")}</p>
            <p className="text-gray text-base md:text-[17px] leading-[1.9]">{solariumSection("description2")}</p>
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

      {/* Sala bimbi */}
      <section id="sala-bimbi" className="scroll-mt-32 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
              {kidsRoom("subtitle")}
            </p>
            <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.1em] mb-8 leading-tight">
              {kidsRoom("title")}
            </h2>
            <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-6">{kidsRoom("description")}</p>
            <p className="text-gray text-base md:text-[17px] leading-[1.9]">{kidsRoom("description2")}</p>
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
      <section className="py-20 lg:py-28 bg-navy">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
            {t("partnersSubtitle")}
          </p>
          <h2 className="font-heading text-white text-2xl md:text-4xl uppercase tracking-[0.1em] mb-12">
            {t("partners")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-full max-w-sm border border-white/10 p-6 md:p-8 flex flex-col items-center justify-center hover:border-gold/40 transition-colors duration-300">
              <p className="font-heading text-white text-sm md:text-base text-center">{t("purograno")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (accordion nativo: cliccabile, accessibile, senza JS) */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <h2 className="font-heading text-navy text-2xl md:text-3xl uppercase tracking-[0.1em] mb-8">
            {t("faqSectionTitle")}
          </h2>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {faqPairs.map(([qKey, aKey]) => (
              <details key={qKey} className="group faq-details">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-navy text-lg outline-none transition-colors hover:text-navy/80 focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 rounded-md [&::-webkit-details-marker]:hidden">
                  <span>{t(qKey)}</span>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy/15 text-gold transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="border-l-2 border-gold/80 pl-5 pb-5 text-gray text-[15px] leading-[1.8]">
                  {t(aKey)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
