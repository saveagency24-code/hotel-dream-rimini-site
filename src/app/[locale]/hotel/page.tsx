import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.hotelTitle, description: messages.meta.hotelDesc };
}

export default async function HotelPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HotelContent />;
}

const TRIPADVISOR_URL = "https://www.tripadvisor.it/Hotel_Review-g1183879-d3308669-Reviews-Hotel_Dream-Miramare_Rimini_Province_of_Rimini_Emilia_Romagna.html";

function HotelContent() {
  const t = useTranslations("hotel");
  const reviews = useTranslations("reviews");

  const threeColumns = [
    {
      title: t("position"),
      text: t("positionText"),
      icon: (
        <svg className="w-8 h-8 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: t("concept"),
      text: t("conceptText"),
      icon: (
        <svg className="w-8 h-8 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
    {
      title: t("team"),
      text: t("teamText"),
      icon: (
        <svg className="w-8 h-8 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
  ] as const;

  const hotelReviewItems = [
    { author: reviews("review1Author"), text: reviews("review1Text") },
    { author: reviews("review2Author"), text: reviews("review2Text") },
    { author: reviews("review3Author"), text: reviews("review3Text") },
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
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/60" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-marquee whitespace-nowrap flex absolute bottom-[30%]">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="text-white/[0.04] text-[10rem] md:text-[14rem] font-heading uppercase tracking-wider mx-4 select-none">
                Hotel&nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 pb-16 w-full">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4 animate-fade-in">
            {t("subtitle")}
          </p>
          <h1 className="font-heading text-white text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] animate-fade-in delay-100">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Stats ribbon */}
      <section className="bg-gold">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[t("totalRooms"), t("metersFromSea"), t("newManagement"), t("breakfastIncluded")].map((stat) => (
            <div key={stat} className="text-center">
              <p className="text-navy text-[11px] md:text-xs uppercase tracking-[0.2em] font-body">{stat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content: solo descrizione, layout coerente */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[900px] mx-auto px-5 md:px-8">
          <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-8">{t("description")}</p>
          <p className="text-gray text-base md:text-[17px] leading-[1.9]">{t("description2")}</p>
        </div>
      </section>

      {/* Hall & ambienti comuni */}
      <section className="py-16 lg:py-24 bg-white border-t border-gray-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <h2 className="font-heading text-navy text-2xl md:text-4xl uppercase tracking-[0.1em] mb-4">
            {t("commonAreasTitle")}
          </h2>
          <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-10 max-w-2xl">{t("commonAreasSubtitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/hotel-lobby-1.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover origin-center scale-[1.68]"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden img-zoom">
              <Image
                src="/images/hotel-lobby-2.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three columns con icone */}
      <section className="py-20 lg:py-28 bg-navy">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {threeColumns.map(({ title, text, icon }) => (
            <div key={title} className="flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                {icon}
                <h3 className="font-heading text-gold text-xl md:text-2xl uppercase tracking-[0.15em]">{title}</h3>
              </div>
              <p className="text-white/60 text-[15px] leading-[1.9]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recensioni */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
            {reviews("subtitle")}
          </p>
          <h2 className="font-heading text-navy text-2xl md:text-4xl uppercase tracking-[0.08em] mb-12">
            {reviews("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {hotelReviewItems.map((item, i) => (
              <div key={i} className="border border-gray-border p-6 md:p-8 flex flex-col">
                <div className="flex gap-1 mb-4" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-navy text-[15px] leading-[1.8] mb-6 flex-1">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-navy/70 text-sm font-body">{item.author}</span>
                  <span className="text-gold text-[10px] uppercase tracking-[0.2em] font-body">
                    {reviews("verifiedBy")}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-navy text-navy text-[11px] uppercase tracking-[0.2em] font-body px-6 py-3 hover:bg-navy hover:text-white transition-colors duration-300"
          >
            {reviews("readMore")}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
