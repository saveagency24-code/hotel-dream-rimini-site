import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import StructuredData from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/geo";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const content = {
  it: {
    title: "Come Arrivare | Hotel Dream Rimini",
    subtitle: "Stazione Miramare, Metro Mare e collegamenti rapidi",
    intro:
      "Hotel Dream si trova in Viale Tirrenia 10, Miramare di Rimini, a 150 metri dal mare. La struttura è comoda da raggiungere sia in auto sia con i mezzi pubblici.",
    points: [
      "Stazione di Miramare: a pochi minuti a piedi dall'hotel.",
      "Metro Mare Rimini-Riccione: fermata Miramare vicina alla struttura.",
      "Stazione di Rimini: collegata rapidamente con treno e bus.",
      "Aeroporto Fellini: circa 5 minuti in auto.",
    ],
  },
  en: {
    title: "How to Reach Us | Hotel Dream Rimini",
    subtitle: "Miramare Station, Metro Mare and fast connections",
    intro:
      "Hotel Dream is located in Viale Tirrenia 10, Miramare di Rimini, 150 meters from the sea. You can reach us easily by car or public transport.",
    points: [
      "Miramare station: a few minutes' walk from the hotel.",
      "Metro Mare Rimini-Riccione: Miramare stop near the property.",
      "Rimini station: quick train and bus connections.",
      "Fellini Airport: around 5 minutes by car.",
    ],
  },
  de: {
    title: "Anreise | Hotel Dream Rimini",
    subtitle: "Bahnhof Miramare, Metro Mare und schnelle Verbindungen",
    intro:
      "Das Hotel Dream befindet sich in der Viale Tirrenia 10 in Miramare di Rimini, nur 150 Meter vom Meer entfernt. Die Anreise ist mit Auto oder öffentlichen Verkehrsmitteln einfach.",
    points: [
      "Bahnhof Miramare: wenige Gehminuten vom Hotel.",
      "Metro Mare Rimini-Riccione: Haltestelle Miramare in der Nähe.",
      "Bahnhof Rimini: schnelle Zug- und Busverbindungen.",
      "Flughafen Fellini: ca. 5 Minuten mit dem Auto.",
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const data = content[(locale as keyof typeof content) || "it"];
  return {
    title: data.title,
    description: data.intro,
  };
}

export default async function HowToReachPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = content[(locale as keyof typeof content) || "it"];

  return (
    <section className="py-20 lg:py-28">
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/${locale}` },
          { name: data.title, url: `${SITE_URL}/${locale}/come-arrivare` },
        ])}
      />
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <p className="text-gold/80 text-[11px] uppercase tracking-[0.35em] font-body mb-4">
          {data.subtitle}
        </p>
        <h1 className="font-heading text-navy text-[clamp(2.2rem,5vw,3.5rem)] mb-6">{data.title}</h1>
        <p className="text-gray text-[16px] leading-[1.9] mb-10">{data.intro}</p>
        <ul className="space-y-4">
          {data.points.map((point) => (
            <li key={point} className="border-l-2 border-gold pl-5 text-gray text-[15px] leading-[1.8]">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
