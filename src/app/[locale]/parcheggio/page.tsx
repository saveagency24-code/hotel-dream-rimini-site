import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.parkingTitle, description: messages.meta.parkingDesc };
}

export default async function ParkingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ParkingContent />;
}

function ParkingContent() {
  const t = useTranslations("parking");
  const common = useTranslations("common");

  const features = ["private", "internal", "accessible", "reservation"] as const;

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 to-navy/90 z-10" />
        <div className="relative z-20 text-center px-4 pt-24">
          <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4 font-body">{t("subtitle")}</p>
          <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl">{t("title")}</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gray text-base md:text-lg leading-relaxed mb-8">{t("description")}</p>

              <div className="bg-gold/10 border border-gold/30 p-6 mb-8">
                <p className="font-heading text-navy text-2xl">{t("price")}</p>
              </div>

              <h3 className="text-navy text-sm uppercase tracking-wider font-body mb-4">{t("features")}</h3>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray">
                    <svg className="w-5 h-5 text-turquoise shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t(f)}
                  </li>
                ))}
              </ul>

              <p className="text-gray/70 text-sm mt-6 italic">{t("note")}</p>
            </div>
            <div className="bg-navy/5 aspect-square flex items-center justify-center text-navy/30 text-sm">
              Foto parcheggio
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
