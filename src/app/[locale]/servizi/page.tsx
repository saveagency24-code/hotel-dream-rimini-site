import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { getBreadcrumbSchema, getServicesFaqSchema } from "@/lib/geo";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.servicesTitle, description: messages.meta.servicesDesc };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent locale={locale} />;
}

function ServicesContent({ locale }: { locale: string }) {
  const t = useTranslations("services");
  const breakfast = useTranslations("breakfast");
  const bar = useTranslations("bar");

  const allServices = [
    { title: "breakfastTitle" as const, desc: "breakfastDesc" as const },
    { title: "barTitle" as const, desc: "barDesc" as const },
    { title: "solariumTitle" as const, desc: "solariumDesc" as const },
    { title: "parkingTitle" as const, desc: "parkingDesc" as const },
    { title: "wifiTitle" as const, desc: "wifiDesc" as const },
    { title: "beachTitle" as const, desc: "beachDesc" as const },
    { title: "cleaningTitle" as const, desc: "cleaningDesc" as const },
    { title: "acTitle" as const, desc: "acDesc" as const },
    { title: "tvTitle" as const, desc: "tvDesc" as const },
    { title: "bikesTitle" as const, desc: "bikesDesc" as const },
    { title: "restaurantsTitle" as const, desc: "restaurantsDesc" as const },
    { title: "receptionTitle" as const, desc: "receptionDesc" as const },
  ];

  const breakfastCategories = [
    { key: "sweet" as const, items: "sweetItems" as const },
    { key: "savory" as const, items: "savoryItems" as const },
    { key: "drinks" as const, items: "drinksItems" as const },
    { key: "fresh" as const, items: "freshItems" as const },
  ];

  const barItems = [
    { key: "aperitivo" as const, icon: "🍹" },
    { key: "drinks" as const, icon: "🥂" },
    { key: "coffee" as const, icon: "☕" },
    { key: "snacks" as const, icon: "🍕" },
  ];

  return (
    <>
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: "Servizi", url: `${SITE_URL}/${locale}/servizi` },
        ])}
      />
      <StructuredData data={getServicesFaqSchema()} />
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden bg-navy">
        <Image
          src="/images/servizi-1.jpg"
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

      {/* Services grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map(({ title, desc }) => (
              <div key={title} className="bg-white p-8 md:p-10 group hover:bg-navy transition-colors duration-500">
                <h3 className="font-heading text-navy text-lg md:text-xl uppercase tracking-[0.15em] mb-4 group-hover:text-gold transition-colors duration-500">
                  {t(title)}
                </h3>
                <p className="text-gray text-sm leading-[1.8] group-hover:text-white/60 transition-colors duration-500">
                  {t(desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breakfast section */}
      <section id="colazione" className="scroll-mt-32 py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="relative aspect-[4/5] bg-white overflow-hidden">
              <Image
                src="/images/sala-colazione.jpg"
                alt="Sala colazione"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:pt-6">
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {breakfast("subtitle")}
              </p>
              <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.1em] mb-8 leading-tight">
                {breakfast("title")}
              </h2>
              <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-6">{breakfast("description")}</p>
              <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-12">{breakfast("description2")}</p>

              <div className="space-y-7">
                {breakfastCategories.map(({ key, items }) => (
                  <div key={key} className="border-l-2 border-gold pl-6">
                    <h3 className="font-heading text-navy text-lg uppercase tracking-[0.15em] mb-2">
                      {breakfast(key)}
                    </h3>
                    <p className="text-gray text-sm leading-relaxed">{breakfast(items)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bar section */}
      <section id="bar" className="scroll-mt-32 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            <div>
              <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
                {bar("subtitle")}
              </p>
              <h2 className="font-heading text-navy text-3xl md:text-[2.75rem] uppercase tracking-[0.1em] mb-8 leading-tight">
                {bar("title")}
              </h2>
              <p className="text-gray text-base md:text-[17px] leading-[1.9] mb-6">{bar("description")}</p>
              <p className="text-gray text-base md:text-[17px] leading-[1.9]">{bar("description2")}</p>
            </div>
            <div className="relative aspect-[4/3] bg-white overflow-hidden">
              <Image
                src="/images/bar-interno.jpg"
                alt="Bar Hotel Dream"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {barItems.map(({ key, icon }) => (
              <div
                key={key}
                className="group border border-navy/10 p-8 md:p-10 text-center hover:bg-navy hover:border-navy transition-all duration-500 cursor-default"
              >
                <span className="block text-4xl mb-5 group-hover:scale-110 transition-transform duration-500">
                  {icon}
                </span>
                <h3 className="font-heading text-navy text-lg uppercase tracking-[0.15em] group-hover:text-gold transition-colors duration-500">
                  {bar(key)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 lg:py-28 bg-navy">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
            {t("partnersSubtitle")}
          </p>
          <h2 className="font-heading text-white text-2xl md:text-4xl uppercase tracking-[0.1em] mb-12">
            {t("partners")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "rossopomodoro" as const,
              "purograno" as const,
              "dallaLella" as const,
              "amor" as const,
            ].map((key) => (
              <div key={key} className="border border-white/10 p-6 md:p-8 flex flex-col items-center justify-center hover:border-gold/40 transition-colors duration-300">
                <p className="font-heading text-white text-sm md:text-base text-center">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <h2 className="font-heading text-navy text-2xl md:text-3xl uppercase tracking-[0.1em] mb-8">
            FAQ Servizi
          </h2>
          <div className="space-y-6">
            <div className="border-l-2 border-gold pl-5">
              <h3 className="font-heading text-navy text-lg mb-2">A che ora viene servita la colazione?</h3>
              <p className="text-gray text-[15px] leading-[1.8]">
                La colazione viene servita ogni giorno dalle 7.00 alle 11.00.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-5">
              <h3 className="font-heading text-navy text-lg mb-2">Avete convenzioni con ristoranti?</h3>
              <p className="text-gray text-[15px] leading-[1.8]">
                Sì, abbiamo convenzioni attive con ristoranti partner a Rimini e Miramare.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-5">
              <h3 className="font-heading text-navy text-lg mb-2">Come raggiungo l'hotel con i mezzi?</h3>
              <p className="text-gray text-[15px] leading-[1.8]">
                La stazione di Miramare e la fermata Metro Mare sono vicine all'hotel e permettono
                collegamenti rapidi con Rimini e Riccione.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
