import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.hotelTitle, description: messages.meta.hotelDesc };
}

export default async function HotelPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HotelContent />;
}

function HotelContent() {
  const t = useTranslations("hotel");

  const stats = [
    { value: t("totalRooms"), icon: "🏨" },
    { value: t("metersFromSea"), icon: "🏖️" },
    { value: t("newManagement"), icon: "✨" },
    { value: t("breakfastIncluded"), icon: "☕" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 to-navy/90 z-10" />
        <div className="relative z-20 text-center px-4 pt-24">
          <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4 font-body">{t("subtitle")}</p>
          <h1 className="font-heading text-white text-4xl md:text-6xl lg:text-7xl">{t("title")}</h1>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gold py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, icon }) => (
            <div key={value} className="text-navy">
              <span className="text-2xl mb-1 block">{icon}</span>
              <p className="font-heading text-lg uppercase tracking-wider">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-gray text-base md:text-lg leading-relaxed mb-6">{t("description")}</p>
              <p className="text-gray text-base md:text-lg leading-relaxed">{t("description2")}</p>
            </div>
            <div className="bg-navy/5 aspect-[4/3] flex items-center justify-center text-navy/30 text-sm">
              Foto hotel
            </div>
          </div>
        </div>
      </section>

      {/* Position + Concept + Team */}
      <section className="py-20 lg:py-28 bg-gray-light">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: t("position"), text: t("positionText") },
            { title: t("concept"), text: t("conceptText") },
            { title: t("team"), text: t("teamText") },
          ].map(({ title, text }) => (
            <div key={title} className="text-center">
              <h3 className="font-heading text-navy text-2xl mb-4">{title}</h3>
              <p className="text-gray text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
