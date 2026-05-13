import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { BOOKING_PORTAL_URL } from "@/lib/site";
import { seoForPath } from "@/lib/seo-metadata";
import ServicePhotoCarousel from "@/components/ServicePhotoCarousel";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.roomsTitle,
    description: messages.meta.roomsDesc,
    ...seoForPath("/camere", locale),
  };
}

export default async function RoomsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomsContent />;
}

const ROOM_IMAGES: Record<string, string[]> = {
  double: [
    "/images/camere/camera-doppia/hotel-dream-rimini-camera-doppia-sel-01.jpg",
    "/images/camere/camera-doppia/hotel-dream-rimini-camera-doppia-sel-02.jpg",
    "/images/camere/camera-doppia/hotel-dream-rimini-camera-doppia-sel-03.jpg",
    "/images/camere/camera-doppia/hotel-dream-rimini-camere-camera-matrimoniale-98.jpg",
  ],
  suite: [
    "/images/camere/camera-suite.png",
  ],
  triple: [
    "/images/camere/camera-tripla/hotel-dream-rimini-camera-tripla-sel-01.jpg",
    "/images/camere/camera-tripla/hotel-dream-rimini-camera-tripla-sel-02.jpg",
    "/images/camere/camera-tripla/hotel-dream-rimini-camera-tripla-sel-03.jpg",
    "/images/camere/camera-tripla/hotel-dream-rimini-camera-tripla-sel-04.jpg",
  ],
  quadruple: [
    "/images/camere/camera-quadrupla/hotel-dream-rimini-camera-quadrupla-sel-01.jpg",
    "/images/camere/camera-quadrupla/hotel-dream-rimini-camera-quadrupla-sel-02.jpg",
    "/images/camere/camera-quadrupla/hotel-dream-rimini-camera-quadrupla-sel-03.jpg",
  ],
  single: [
    "/images/camere/camera-singola/hotel-dream-rimini-camera-singola-sel-01.jpg",
    "/images/camere/camera-singola.png",
  ],
  group: [
    "/images/camere/camera-gruppo.png",
    "/images/camere/generiche/hotel-dream-rimini-camere-foto-07.jpg",
  ],
  family: [
    "/images/camere/camera-familiare.png",
    "/images/camere/generiche/hotel-dream-rimini-camere-foto-12.jpg",
  ],
};

const ROOM_COUNTS: Record<string, string> = {
  single: "4",
  double: "14",
  suite: "2",
  triple: "5",
  quadruple: "6",
  group: "2",
  family: "2",
};

function RoomsContent() {
  const t = useTranslations("rooms");
  const common = useTranslations("common");

  const roomTypes = [
    "double",
    "suite",
    "triple",
    "quadruple",
    "single",
    "group",
    "family",
  ] as const;

  const amenities = ["amenityAC", "amenityTV", "amenityWifi", "amenityCleaning"] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden bg-navy">
        <Image
          src="/images/hero-camere-letto.png"
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

      {/* Intro text */}
      <section className="py-16 lg:py-20 border-b border-gray-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <p className="text-gray text-base md:text-lg leading-[1.9] max-w-3xl">
            {t("introText")}
          </p>
        </div>
      </section>

      {/* Room sections — stile Aria */}
      <div className="divide-y divide-gray-border">
        {roomTypes.map((key, i) => {
          const images = ROOM_IMAGES[key] ?? [];
          const count = ROOM_COUNTS[key] ?? "";
          const isEven = i % 2 === 0;

          const carouselImages = images.map((src, idx) => ({
            src,
            alt: `${t(key)} — foto ${idx + 1}`,
          }));

          return (
            <section key={key} className={`py-16 lg:py-24 ${isEven ? "bg-white" : "bg-[#f9f9f9]"}`}>
              <div className="max-w-[1400px] mx-auto px-5 md:px-8">

                {/* Galleria foto — stile Aria: ampia, sopra il testo */}
                <div className="mb-10 -mx-1">
                  {images.length === 1 ? (
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-navy/5">
                      <Image
                        src={images[0]}
                        alt={t(key)}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                    </div>
                  ) : (
                    <ServicePhotoCarousel
                      images={carouselImages}
                      prevLabel={common("carouselPrev")}
                      nextLabel={common("carouselNext")}
                    />
                  )}
                </div>

                {/* Contenuto: nome + info + CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start">
                  <div>
                    {/* Badge categoria */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-px bg-gold" />
                      <p className="text-gold text-[11px] uppercase tracking-[0.3em] font-body">
                        {t(`${key}Count`)}
                      </p>
                    </div>

                    {/* Nome camera */}
                    <h2 className="font-heading text-navy text-[clamp(1.8rem,4vw,3rem)] uppercase tracking-[0.08em] mb-5 leading-tight">
                      {t(key)}
                    </h2>

                    {/* Descrizione */}
                    <p className="text-gray text-[15px] md:text-base leading-[1.9] mb-8 max-w-2xl">
                      {t(`${key}Desc`)}
                    </p>

                    {/* Badge servizi */}
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center gap-2 border border-navy/15 text-navy text-[11px] uppercase tracking-[0.15em] font-body px-4 py-2 bg-white"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                          {t(a)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA colonna destra */}
                  <div className="flex flex-col items-start lg:items-end gap-4 pt-1">
                    {count && (
                      <div className="text-right">
                        <span className="block font-heading text-navy text-5xl md:text-6xl leading-none">{count}</span>
                        <span className="text-gray text-[11px] uppercase tracking-[0.2em] font-body">
                          {count === "1" ? "camera" : "camere"}
                        </span>
                      </div>
                    )}
                    <a
                      href={BOOKING_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-navy text-white text-[11px] uppercase tracking-[0.2em] font-body px-7 py-3.5 hover:bg-gold hover:text-navy transition-all duration-300 mt-2"
                    >
                      {t("requestInfo")}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Striscia amenità generali */}
      <section className="py-16 bg-navy">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-6">{t("allRoomsInclude")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {amenities.map((a) => (
              <div key={a} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden />
                <span className="text-white text-[13px] uppercase tracking-[0.15em] font-body">{t(a)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
