import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { BOOKING_PORTAL_URL } from "@/lib/site";
import { seoForPath } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.offersTitle,
    description: messages.meta.offersDesc,
    ...seoForPath("/offerte", locale),
  };
}

export default async function OffersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <OffersContent />;
}

function OfferCard({
  title,
  description,
  includes,
  image,
  label,
  reverse,
  bookLabel,
}: {
  title: string;
  description: string;
  includes: string;
  image: string;
  label: string;
  reverse?: boolean;
  bookLabel: string;
}) {
  const includeItems = includes.split(" · ");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      <div className={`${reverse ? "lg:order-1" : "lg:order-2"} relative aspect-[4/3] bg-white overflow-hidden group`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gold text-navy text-[10px] uppercase tracking-[0.15em] font-body px-3 py-1.5">
            {label}
          </span>
        </div>
      </div>
      <div className={reverse ? "lg:order-2" : "lg:order-1"}>
        <h2 className="font-heading text-navy text-2xl md:text-3xl uppercase tracking-[0.1em] mb-5">
          {title}
        </h2>
        <p className="text-gray text-[15px] leading-[1.9] mb-6">{description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {includeItems.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 text-navy text-[12px] tracking-wide font-body bg-white px-3 py-1.5 rounded-sm border border-gray-border/70"
            >
              <svg className="w-3 h-3 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {item.trim()}
            </span>
          ))}
        </div>

        <a
          href={BOOKING_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gold text-navy text-[11px] uppercase tracking-[0.2em] font-body px-8 py-3.5 hover:bg-gold-dark transition-colors duration-300"
        >
          {bookLabel}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function OffersContent() {
  const t = useTranslations("offers");

  const offers = [
    { titleKey: "weekend", descKey: "weekendDesc", includesKey: "weekendIncludes", image: "/images/offerta-weekend.jpg", labelKey: "offerVacanza" },
    { titleKey: "couplesPack", descKey: "couplesDesc", includesKey: "couplesIncludes", image: "/images/offerta-coppia.png", labelKey: "offerRomantica" },
    { titleKey: "familyPack", descKey: "familyDesc", includesKey: "familyIncludes", image: "/images/offerta-famiglia.png", labelKey: "offerFamiglia" },
    { titleKey: "weekendSeaPack", descKey: "weekendSeaDesc", includesKey: "weekendSeaIncludes", image: "/images/offerta-mare.jpg", labelKey: "offerMare" },
    { titleKey: "businessPack", descKey: "businessDesc", includesKey: "businessIncludes", image: "/images/offerta-business.png", labelKey: "offerBusiness" },
    { titleKey: "eventsPack", descKey: "eventsDesc", includesKey: "eventsIncludes", image: "/images/offerta-eventi.jpg", labelKey: "offerEventi" },
  ] as const;

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

      {/* All offer cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 space-y-24 lg:space-y-32">
          {offers.map((offer, i) => (
            <OfferCard
              key={offer.titleKey}
              title={t(offer.titleKey)}
              description={t(offer.descKey)}
              includes={t(offer.includesKey)}
              image={offer.image}
              label={t(offer.labelKey)}
              reverse={i % 2 === 1}
              bookLabel={t("bookNow")}
            />
          ))}
        </div>
      </section>
    </>
  );
}
