import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.attractionsTitle, description: messages.meta.attractionsDesc };
}

export default async function AttractionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AttractionsContent />;
}

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
                className="bg-white p-8 md:p-10 group hover:bg-navy transition-colors duration-500"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-heading text-navy text-xl md:text-2xl uppercase tracking-[0.1em] mb-3 group-hover:text-gold transition-colors duration-500">
                      {t(key)}
                    </h3>
                    <p className="text-gray text-sm leading-[1.8] mb-4 group-hover:text-white/60 transition-colors duration-500">
                      {t(`${key}Desc`)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-px bg-turquoise" />
                  <p className="text-turquoise text-[11px] uppercase tracking-[0.2em] font-body group-hover:text-turquoise transition-colors duration-500">
                    {t("fromHotel")}: {t(`${key}Dist`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
