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
    { key: "double" as const,    img: "/images/camere/camera-doppia.png" },
    { key: "suite" as const,     img: "/images/camere/camera-suite.png" },
    { key: "triple" as const,    img: "/images/camere/camera-tripla.png" },
    { key: "quadruple" as const, img: "/images/camere/camera-quadrupla.png" },
    { key: "single" as const,    img: "/images/camere/camera-singola.png" },
    { key: "family" as const,    img: "/images/camere/camera-familiare.png" },
    { key: "group" as const,     img: "/images/camere/camera-gruppo.png" },
  ] as const;

  const amenities = ["amenityAC", "amenityTV", "amenityWifi", "amenityCleaning"] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden bg-navy">
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

      {/* Intro */}
      <section className="py-14 border-b border-gray-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <p className="text-gray text-base md:text-lg leading-[1.9] max-w-3xl">
            {t("introText")}
          </p>
        </div>
      </section>

      {/* Griglia camere — stile Aria 2 colonne */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {roomTypes.map(({ key, img }) => (
              <article key={key} className="group flex flex-col bg-white border border-gray-border hover:border-navy/20 transition-colors duration-300">

                {/* Immagine */}
                <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                  <Image
                    src={img}
                    alt={t(key)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Badge numero camere */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-navy/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.2em] font-body px-3 py-1.5">
                      {ROOM_COUNTS[key]}x
                    </span>
                  </div>
                </div>

                {/* Contenuto */}
                <div className="flex flex-col flex-1 p-7 md:p-8">
                  {/* Label categoria */}
                  <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-body mb-2">
                    {t(`${key}Count`)}
                  </p>

                  {/* Nome camera */}
                  <h2 className="font-heading text-navy text-2xl md:text-3xl uppercase tracking-[0.08em] mb-4 leading-tight">
                    {t(key)}
                  </h2>

                  {/* Descrizione */}
                  <p className="text-gray text-[14px] md:text-[15px] leading-[1.9] mb-6 flex-1">
                    {t(`${key}Desc`)}
                  </p>

                  {/* Amenità */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {amenities.map((a) => (
                      <span
                        key={a}
                        className="text-navy/60 text-[10px] uppercase tracking-[0.15em] font-body border border-navy/10 px-3 py-1.5"
                      >
                        {t(a)}
                      </span>
                    ))}
                  </div>

                  {/* CTA — stile Aria: bordo arrotondato */}
                  <div>
                    <a
                      href={BOOKING_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 border border-navy text-navy text-[11px] uppercase tracking-[0.2em] font-body px-6 py-3 rounded-full hover:bg-navy hover:text-white transition-all duration-300"
                    >
                      {t("requestInfo")}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Striscia servizi inclusi */}
      <section className="py-14 bg-navy">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-16">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body shrink-0">
            {t("allRoomsInclude")}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {amenities.map((a) => (
              <span key={a} className="flex items-center gap-2 text-white text-[12px] uppercase tracking-[0.15em] font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                {t(a)}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
