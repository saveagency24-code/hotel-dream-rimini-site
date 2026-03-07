import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.offersTitle, description: messages.meta.offersDesc };
}

export default async function OffersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <OffersContent />;
}

function OffersContent() {
  const t = useTranslations("offers");

  const packages = [
    "couplesPack",
    "familyPack",
    "businessPack",
    "weekendSeaPack",
    "eventsPack",
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

      {/* Active offers */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Cosmoprof */}
            <div className="border-2 border-gold p-10 relative">
              <span className="absolute -top-3 left-6 bg-gold text-navy text-xs px-3 py-1 uppercase tracking-wider font-body">
                {t("from")} €49
              </span>
              <h2 className="font-heading text-navy text-2xl md:text-3xl mb-4">{t("cosmoprof")}</h2>
              <p className="text-gray text-base mb-6">{t("cosmoprofDesc")}</p>
              <ul className="space-y-2 text-navy text-sm mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("cosmoprofSingle")}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("cosmoprofDouble")}
                </li>
              </ul>
              <p className="text-gray text-xs mb-8">{t("cosmoprofIncludes")}</p>
              <Link
                href="/contatti"
                className="bg-gold text-navy px-6 py-3 text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors inline-block"
              >
                {t("bookNow")}
              </Link>
            </div>

            {/* Weekend */}
            <div className="border-2 border-gold p-10 relative">
              <span className="absolute -top-3 left-6 bg-gold text-navy text-xs px-3 py-1 uppercase tracking-wider font-body">
                {t("weekendPrice")}
              </span>
              <h2 className="font-heading text-navy text-2xl md:text-3xl mb-4">{t("weekend")}</h2>
              <p className="text-gray text-base mb-6">{t("weekendDesc")}</p>
              <p className="text-navy text-sm mb-8">{t("weekendIncludes")}</p>
              <Link
                href="/contatti"
                className="bg-gold text-navy px-6 py-3 text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors inline-block"
              >
                {t("bookNow")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Future packages */}
      <section className="py-20 lg:py-28 bg-gray-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((p) => (
              <div key={p} className="bg-white p-8 border border-gray-border hover:border-gold transition-colors">
                <h3 className="font-heading text-navy text-xl mb-3">{t(p)}</h3>
                <p className="text-turquoise text-xs uppercase tracking-wider font-body mb-3">{t("comingSoon")}</p>
                <p className="text-gray text-sm mb-6">{t("comingSoonDesc")}</p>
                <Link
                  href="/contatti"
                  className="text-gold text-sm uppercase tracking-wider hover:text-gold-dark transition-colors"
                >
                  {t("bookNow")} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
