import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.roomsTitle, description: messages.meta.roomsDesc };
}

export default async function RoomsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomsContent />;
}

function RoomsContent() {
  const t = useTranslations("rooms");
  const common = useTranslations("common");

  const roomTypes = [
    { key: "single", count: "4" },
    { key: "double", count: "14" },
    { key: "suite", count: "2" },
    { key: "triple", count: "5" },
    { key: "quadruple", count: "6" },
    { key: "group", count: "2" },
    { key: "family", count: "2" },
  ] as const;

  const amenities = ["amenityAC", "amenityTV", "amenityWifi", "amenityCleaning"] as const;

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
          <div className="space-y-20">
            {roomTypes.map(({ key, count }, i) => (
              <div
                key={key}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="bg-navy/5 aspect-[16/10] flex items-center justify-center text-navy/30 text-sm">
                    Foto {t(key)}
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="text-turquoise text-xs uppercase tracking-wider font-body">
                    {t(`${key}Count`)}
                  </span>
                  <h2 className="font-heading text-navy text-3xl md:text-4xl mt-2 mb-4">
                    {t(key)}
                  </h2>
                  <p className="text-gray text-base leading-relaxed mb-6">
                    {t(`${key}Desc`)}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-navy text-sm uppercase tracking-wider font-body mb-3">{t("amenities")}</h4>
                    <div className="flex flex-wrap gap-3">
                      {amenities.map((a) => (
                        <span key={a} className="bg-turquoise-light text-navy text-xs px-3 py-1.5 rounded-full">
                          {t(a)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contatti"
                    className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors"
                  >
                    {t("requestInfo")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
