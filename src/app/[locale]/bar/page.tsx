import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.barTitle, description: messages.meta.barDesc };
}

export default async function BarPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BarContent />;
}

function BarContent() {
  const t = useTranslations("bar");

  const items = [
    { key: "aperitivo", icon: "🍹" },
    { key: "drinks", icon: "🍸" },
    { key: "coffee", icon: "☕" },
    { key: "snacks", icon: "🥜" },
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

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gray text-base md:text-lg leading-relaxed mb-6">{t("description")}</p>
              <p className="text-gray text-base leading-relaxed">{t("description2")}</p>
            </div>
            <div className="bg-navy/5 aspect-square flex items-center justify-center text-navy/30 text-sm">
              Foto bar
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gold/10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map(({ key, icon }) => (
            <div key={key} className="text-center">
              <span className="text-4xl mb-3 block">{icon}</span>
              <h3 className="font-heading text-navy text-lg">{t(key)}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
