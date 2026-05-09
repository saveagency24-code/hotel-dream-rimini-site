import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { seoForPath } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.attractionsTitle,
    description: messages.meta.attractionsDesc,
    ...seoForPath("/attrazioni", locale),
  };
}

export default async function AttractionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AttractionsContent />;
}

const attractionImages: Record<string, string> = {
  italiaInMiniatura: "/images/attrazioni/italia-in-miniatura.png",
  mirabilandia: "/images/attrazioni/mirabilandia.png",
  fiabilandia: "/images/attrazioni/fiabilandia.png",
  aquafan: "/images/attrazioni/aquafan.png",
  oltremare: "/images/attrazioni/oltremare.png",
  centroStorico: "/images/attrazioni/centro-storico.png",
  fiera: "/images/attrazioni/rimini-fiera.png",
  ceccarini: "/images/attrazioni/viale-ceccarini.png",
  nightlife: "/images/attrazioni/nightlife.png",
  parks: "/images/attrazioni/parks.png",
  metromare: "/images/attrazioni/metromare.png",
};

function AttractionsContent() {
  const t = useTranslations("attractions");

  const attractions = [
    "italiaInMiniatura",
    "mirabilandia",
    "fiabilandia",
    "aquafan",
    "oltremare",
    "centroStorico",
    "fiera",
    "ceccarini",
    "nightlife",
    "parks",
    "metromare",
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

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-gray text-base md:text-lg leading-[1.9]">{t("intro")}</p>
        </div>
      </section>

      {/* Attractions grid */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attractions.map((key) => (
              <div
                key={key}
                className="bg-white group hover:bg-navy transition-colors duration-500 overflow-hidden"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={attractionImages[key]}
                    alt={t(key)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="font-heading text-navy text-xl md:text-2xl uppercase tracking-[0.1em] mb-3 group-hover:text-gold transition-colors duration-500">
                    {t(key)}
                  </h3>
                  <p className="text-gray text-sm leading-[1.8] mb-4 group-hover:text-white/60 transition-colors duration-500">
                    {t(`${key}Desc`)}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-px bg-turquoise" />
                    <p className="text-turquoise text-[11px] uppercase tracking-[0.2em] font-body group-hover:text-turquoise transition-colors duration-500">
                      {t("fromHotel")}: {t(`${key}Dist`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
