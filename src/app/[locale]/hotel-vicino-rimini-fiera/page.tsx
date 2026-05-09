import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import StructuredData from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/geo";
import { BOOKING_PORTAL_URL, SITE_URL } from "@/lib/site";
import { seoForPath } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

const content = {
  it: {
    title: "Hotel vicino Rimini Fiera",
    subtitle: "Business stay a Miramare con collegamenti rapidi",
    intro:
      "Hotel Dream è una base comoda per espositori e visitatori diretti a Rimini Fiera: Wi-Fi veloce, colazione 7:00-11:00, parcheggio privato e collegamenti agevoli da Miramare.",
    points: [
      "Rimini Fiera raggiungibile in circa 20 minuti in auto.",
      "Alternativa smart: treno da Miramare verso Rimini e nodo fiera.",
      "Posizione ideale anche per Cosmoprof Bologna con appoggio su Rimini.",
    ],
    cta: "Prenota il tuo soggiorno",
  },
  en: {
    title: "Hotel near Rimini Fiera",
    subtitle: "Business stay in Miramare with fast connections",
    intro:
      "Hotel Dream is a convenient base for exhibitors and visitors heading to Rimini Fiera: fast Wi-Fi, breakfast 7:00-11:00, private parking and easy connections from Miramare.",
    points: [
      "Rimini Fiera can be reached in about 20 minutes by car.",
      "Smart option: train from Miramare to Rimini and fair area.",
      "Ideal base for Cosmoprof Bologna with Rimini stay strategy.",
    ],
    cta: "Book your stay",
  },
  de: {
    title: "Hotel nahe Rimini Fiera",
    subtitle: "Business-Aufenthalt in Miramare mit schnellen Verbindungen",
    intro:
      "Hotel Dream ist eine praktische Basis für Aussteller und Besucher der Rimini Fiera: schnelles WLAN, Frühstück 7:00-11:00, Privatparkplatz und gute Verbindungen ab Miramare.",
    points: [
      "Rimini Fiera in ca. 20 Minuten mit dem Auto erreichbar.",
      "Smart-Alternative: Zug von Miramare Richtung Rimini/Messebereich.",
      "Auch für Cosmoprof Bologna mit Übernachtung in Rimini geeignet.",
    ],
    cta: "Aufenthalt buchen",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const data = content[(locale as keyof typeof content) || "it"];
  return {
    title: `${data.title} | Hotel Dream Rimini`,
    description: data.intro,
    ...seoForPath("/hotel-vicino-rimini-fiera", locale),
  };
}

export default async function RiminiFieraPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = content[(locale as keyof typeof content) || "it"];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: data.title, url: `${SITE_URL}/${locale}/hotel-vicino-rimini-fiera` },
        ])}
      />
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
          {data.subtitle}
        </p>
        <h1 className="font-heading text-navy text-[clamp(2.2rem,5vw,3.5rem)] mb-6">{data.title}</h1>
        <p className="text-gray text-[16px] leading-[1.9] mb-10">{data.intro}</p>
        <ul className="space-y-4 mb-10">
          {data.points.map((point) => (
            <li key={point} className="border-l-2 border-gold pl-5 text-gray text-[15px] leading-[1.8]">
              {point}
            </li>
          ))}
        </ul>
        <a
          href={BOOKING_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gold text-navy text-[11px] uppercase tracking-[0.2em] font-body px-8 py-3.5 hover:bg-gold-dark transition-colors duration-300"
        >
          {data.cta}
        </a>
      </div>
    </section>
  );
}
