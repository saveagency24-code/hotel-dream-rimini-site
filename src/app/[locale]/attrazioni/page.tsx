import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
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
    { key: "italiaInMiniatura", icon: "🏛️" },
    { key: "mirabilandia", icon: "🎢" },
    { key: "fiabilandia", icon: "🧚" },
    { key: "aquafan", icon: "🌊" },
    { key: "oltremare", icon: "🐬" },
    { key: "centroStorico", icon: "🏰" },
    { key: "fiera", icon: "📊" },
    { key: "ceccarini", icon: "🛍️" },
    { key: "nightlife", icon: "🎵" },
    { key: "parks", icon: "🌿" },
  ] as const;

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 to-navy/90 z-10" />
        <div className="relative z-20 text-center px-4 pt-24">
          <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4 font-body">{t("subtitle")}</p>
          <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl">{t("title")}</h1>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray text-base md:text-lg leading-relaxed">{t("intro")}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attractions.map(({ key, icon }) => (
              <div
                key={key}
                className="bg-white p-8 border border-gray-border hover:border-gold hover:shadow-lg transition-all group flex gap-6"
              >
                <span className="text-3xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-heading text-navy text-xl mb-2">{t(key)}</h3>
                  <p className="text-gray text-sm leading-relaxed mb-3">{t(`${key}Desc`)}</p>
                  <p className="text-turquoise text-xs uppercase tracking-wider font-body">
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
