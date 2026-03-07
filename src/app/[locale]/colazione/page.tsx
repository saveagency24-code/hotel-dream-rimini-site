import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.breakfastTitle, description: messages.meta.breakfastDesc };
}

export default async function BreakfastPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BreakfastContent />;
}

function BreakfastContent() {
  const t = useTranslations("breakfast");

  const categories = [
    { key: "sweet", items: "sweetItems", icon: "🥐" },
    { key: "savory", items: "savoryItems", icon: "🧀" },
    { key: "drinks", items: "drinksItems", icon: "☕" },
    { key: "fresh", items: "freshItems", icon: "🍊" },
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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray text-base md:text-lg leading-relaxed mb-6">{t("description")}</p>
          <p className="text-gray text-base leading-relaxed">{t("description2")}</p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-light">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(({ key, items, icon }) => (
            <div key={key} className="bg-white p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-4 block">{icon}</span>
              <h3 className="font-heading text-navy text-xl mb-3">{t(key)}</h3>
              <p className="text-gray text-sm leading-relaxed">{t(items)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-navy/5 aspect-[21/9] flex items-center justify-center text-white/30 text-sm rounded-lg border border-white/10">
            Foto sala colazione
          </div>
        </div>
      </section>
    </>
  );
}
