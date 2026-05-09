import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { seoForPath } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return {
    title: messages.legal.cookieTitle,
    description: messages.legal.cookieTitle,
    ...seoForPath("/cookie-policy", locale),
  };
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieContent />;
}

function CookieContent() {
  const t = useTranslations("legal");

  const sections = [
    "cookieIntro",
    "cookieWhat",
    "cookieTypes",
    "cookieTechnical",
    "cookieAnalytics",
    "cookieMarketing",
    "cookieManage",
    "cookieChanges",
  ] as const;

  return (
    <>
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <h1 className="font-heading text-white text-3xl md:text-5xl uppercase tracking-[0.1em]">
            {t("cookieTitle")}
          </h1>
          <p className="text-white/40 text-sm mt-4">{t("lastUpdate")}</p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-5 md:px-8 space-y-10">
          {sections.map((key) => (
            <div key={key} className="prose prose-navy max-w-none">
              <p className="text-gray text-[15px] leading-[1.9] whitespace-pre-line">{t(key)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
