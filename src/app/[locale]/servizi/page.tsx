import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.servicesTitle, description: messages.meta.servicesDesc };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("services");

  const allServices = [
    { title: "breakfastTitle", desc: "breakfastDesc", icon: "☕" },
    { title: "barTitle", desc: "barDesc", icon: "🍸" },
    { title: "solariumTitle", desc: "solariumDesc", icon: "☀️" },
    { title: "parkingTitle", desc: "parkingDesc", icon: "🅿️" },
    { title: "wifiTitle", desc: "wifiDesc", icon: "📶" },
    { title: "beachTitle", desc: "beachDesc", icon: "🏖️" },
    { title: "cleaningTitle", desc: "cleaningDesc", icon: "🧹" },
    { title: "acTitle", desc: "acDesc", icon: "❄️" },
    { title: "tvTitle", desc: "tvDesc", icon: "📺" },
    { title: "bikesTitle", desc: "bikesDesc", icon: "🚲" },
    { title: "restaurantsTitle", desc: "restaurantsDesc", icon: "🍽️" },
  ] as const;

  const partners = ["rossopomodoro", "purograno", "dallaLella", "amor"] as const;

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map(({ title, desc, icon }) => (
              <div key={title} className="border border-gray-border p-8 hover:border-gold hover:shadow-lg transition-all group">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-heading text-navy text-xl mb-3">{t(title)}</h3>
                <p className="text-gray text-sm leading-relaxed">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 lg:py-28 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-navy text-3xl md:text-4xl mb-4">{t("partners")}</h2>
          <p className="text-gray text-base mb-12">{t("partnersSubtitle")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((p) => (
              <div key={p} className="bg-white p-6 shadow-sm text-center hover:shadow-lg transition-shadow">
                <p className="font-heading text-navy text-lg">{t(p)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
