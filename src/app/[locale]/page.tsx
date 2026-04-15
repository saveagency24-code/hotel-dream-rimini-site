import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import ScrollRevealCTA from "@/components/ScrollRevealCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

const TRIPADVISOR_URL = "https://www.tripadvisor.it/Hotel_Review-g1183879-d3308669-Reviews-Hotel_Dream-Miramare_Rimini_Province_of_Rimini_Emilia_Romagna.html";
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Hotel+Dream+Rimini+recensioni";

function HomeContent() {
  const t = useTranslations("hero");
  const home = useTranslations("home");
  const rooms = useTranslations("rooms");
  const services = useTranslations("services");
  const offers = useTranslations("offers");
  const reviews = useTranslations("reviews");
  const common = useTranslations("common");

  const reviewItems = [
    { author: reviews("review1Author"), text: reviews("review1Text") },
    { author: reviews("review2Author"), text: reviews("review2Text") },
    { author: reviews("review3Author"), text: reviews("review3Text") },
    { author: reviews("review4Author"), text: reviews("review4Text") },
  ] as const;

  const roomTypes = [
    { key: "single" as const, label: "1 ospite", img: "/images/camere/camera-singola.jpg" },
    { key: "double" as const, label: "2 ospiti", img: "/images/camere/camera-doppia.jpg" },
    { key: "suite" as const, label: "2 ospiti", img: "/images/camere/camera-suite.jpg" },
    { key: "triple" as const, label: "3 ospiti", img: "/images/camere/camera-tripla.jpg" },
    { key: "family" as const, label: "5-6 ospiti", img: "/images/camere/camera-familiare.jpg" },
  ];

  return (
    <>
      {/* ───── HERO ───── */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-navy">
        {/* Background */}
        <div className="absolute inset-0 rounded-lg bg-[url('/images/hotel-esterno-notte.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-navy/50 via-navy/30 to-navy/70" />

        {/* Marquee */}
        <div className="absolute top-[38%] md:top-[35%] left-0 right-0 overflow-hidden pointer-events-none z-10 -translate-y-1/2">
          <div className="animate-marquee whitespace-nowrap flex">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="text-white/[0.07] text-[8rem] md:text-[12rem] lg:text-[16rem] font-heading uppercase tracking-wider mx-4 select-none"
              >
                Dream&nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-20 text-center px-5 max-w-4xl mx-auto">
          <p className="text-gold/80 text-[11px] md:text-xs uppercase tracking-[0.35em] font-body mb-6 animate-fade-in">
            A PLACE TO DREAM ·
          </p>
          <p className="text-white/70 font-heading text-lg md:text-2xl mb-2 animate-fade-in delay-100">
            {t("welcome")}
          </p>
          <h1 className="font-heading text-white text-[clamp(3rem,8vw,7rem)] leading-[0.95] mb-3 animate-fade-in delay-200">
            {t("hotelName")}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in delay-300">
            <span className="w-8 h-px bg-gold/60" />
            <p className="text-turquoise font-heading text-base md:text-xl tracking-widest">
              {t("location")}
            </p>
            <span className="w-8 h-px bg-gold/60" />
          </div>
          <Link
            href="/camere"
            className="inline-flex items-center gap-3 border border-white/40 text-white text-[11px] uppercase tracking-[0.2em] font-body px-8 py-3.5 hover:bg-white hover:text-navy transition-all duration-300 animate-fade-in delay-400"
          >
            {t("cta")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-gold/60" />
        </div>
      </section>

      {/* ───── INTRO ───── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-gray text-base md:text-lg leading-[1.9] mb-8">
            {home("introText")}
          </p>
          <h2 className="font-heading text-navy text-2xl md:text-[2rem] leading-snug">
            {home("introHighlight")}
          </h2>
        </div>
      </section>

      {/* ───── ROOMS STRIP (ARIA STYLE) ───── */}
      <section className="pb-20 lg:pb-28 bg-navy">
        <div className="max-w-[1400px] mx-auto px-0 md:px-5">
          <div className="flex items-stretch gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-5 md:px-0 py-10">
            {roomTypes.map(({ key, label, img }, index) => (
              <Link
                key={key}
                href="/camere"
                className="group relative shrink-0 w-[260px] md:w-[360px] lg:w-[420px] snap-start overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={img}
                    alt={rooms(key)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex flex-col gap-3">
                    <p className="text-white/80 text-[11px] uppercase tracking-[0.2em] font-body">
                      {label}
                    </p>
                    <h3 className="font-heading text-white text-2xl md:text-3xl leading-tight">
                      {rooms(key)}
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm line-clamp-2">
                      {rooms(`${key}Desc`)}
                    </p>
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-2 text-turquoise text-[11px] uppercase tracking-[0.2em] font-body group-hover:gap-3 transition-all duration-300">
                        {common("readMore")}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SERVICES HERO (ARIA STYLE) ───── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="font-heading text-navy text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] mb-6">
              {home("servicesIntroTitle")}
            </h2>
            <Link
              href="/camere"
              className="inline-flex items-center gap-3 bg-gold text-navy text-[11px] uppercase tracking-[0.2em] font-body px-8 py-3.5 hover:bg-gold-dark transition-colors duration-300"
            >
              {home("servicesIntroCta")}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div>
            <p className="text-navy text-[15px] md:text-base leading-[1.9]">
              {home("servicesIntroParagraph1")}
            </p>
          </div>
        </div>
      </section>

      {/* ───── SERVICES SUMMARY SECTION ───── */}
      <section className="py-16 lg:py-24 bg-navy text-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-1">
            <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
              {services("title")}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl leading-snug mb-4">
              {home("servicesHighlightTitle")}
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-[1.9]">
              {home("servicesHighlightSubtitle")}
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: services("breakfastTitle"), desc: services("breakfastDesc") },
              { title: services("barTitle"), desc: services("barDesc") },
              { title: services("solariumTitle"), desc: services("solariumDesc") },
              { title: services("parkingTitle"), desc: services("parkingDesc") },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 bg-white/5 p-5 md:p-6">
                <h3 className="font-heading text-lg md:text-xl mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">{item.desc}</p>
                <Link
                  href="/servizi"
                  className="inline-flex items-center gap-2 text-gold text-[11px] uppercase tracking-[0.2em] font-body hover:gap-3 transition-all duration-300"
                >
                  {common("readMore")}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── OFFERS CAROUSEL ───── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex snap-carousel gap-6 overflow-x-auto pb-4">
            {/* Weekend card */}
            <div className="shrink-0 w-[340px] md:w-[400px] group">
              <div className="relative aspect-[4/3] bg-white overflow-hidden img-zoom">
                <Image
                  src="/images/offerta-weekend.jpg"
                  alt="Offerta Weekend"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gold text-navy text-[10px] uppercase tracking-[0.15em] font-body px-3 py-1.5">
                    Offerta Vacanza
                  </span>
                </div>
              </div>
              <div className="pt-5">
                <h3 className="font-heading text-navy text-xl md:text-2xl leading-tight mb-3">
                  {offers("weekend")}
                </h3>
                <p className="text-gray text-sm mb-4 line-clamp-2">{offers("weekendDesc")}</p>
                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-2 text-turquoise text-[11px] uppercase tracking-[0.2em] font-body group-hover:gap-3 transition-all duration-300"
                >
                  {common("readMore")}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Package cards */}
            {([
              { key: "couplesPack" as const, img: "/images/offerta-coppia.png" },
              { key: "familyPack" as const, img: "/images/offerta-famiglia.png" },
              { key: "businessPack" as const, img: "/images/offerta-business.png" },
              { key: "weekendSeaPack" as const, img: "/images/offerta-mare.jpg" },
              { key: "eventsPack" as const, img: "/images/offerta-eventi.jpg" },
            ]).map(({ key, img }) => (
              <div key={key} className="shrink-0 w-[340px] md:w-[400px] group">
                <div className="relative aspect-[4/3] bg-white overflow-hidden img-zoom">
                  <Image
                    src={img}
                    alt={key}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/80 text-navy text-[10px] uppercase tracking-[0.15em] font-body px-3 py-1.5">
                      {offers("comingSoon")}
                    </span>
                  </div>
                </div>
                <div className="pt-5">
                  <h3 className="font-heading text-navy text-xl md:text-2xl leading-tight mb-3">
                    {offers(key)}
                  </h3>
                  <p className="text-gray text-sm mb-4">{offers("comingSoonDesc")}</p>
                  <Link
                    href="/contatti"
                    className="inline-flex items-center gap-2 text-turquoise text-[11px] uppercase tracking-[0.2em] font-body group-hover:gap-3 transition-all duration-300"
                  >
                    {common("readMore")}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── RECENSIONI VERIFICATE ───── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
            {reviews("subtitle")}
          </p>
          <h2 className="font-heading text-navy text-2xl md:text-4xl uppercase tracking-[0.08em] mb-12">
            {reviews("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {reviewItems.map((item, i) => (
              <div
                key={i}
                className="border border-gray-border p-6 md:p-8 flex flex-col"
              >
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
          <div className="flex flex-wrap gap-4">
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-navy text-navy text-[11px] uppercase tracking-[0.2em] font-body px-6 py-3 hover:bg-navy hover:text-white transition-colors duration-300"
            >
              TripAdvisor
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-navy text-navy text-[11px] uppercase tracking-[0.2em] font-body px-6 py-3 hover:bg-navy hover:text-white transition-colors duration-300"
            >
              {reviews("readMore")}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ───── SCROLL REVEAL CTA ───── */}
      <ScrollRevealCTA />
    </>
  );
}
