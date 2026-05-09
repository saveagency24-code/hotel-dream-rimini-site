import type { Metadata } from "next";
import ContattiPageClient from "./ContattiPageClient";
import { seoForPath } from "@/lib/seo-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.contactsTitle,
    description: messages.meta.contactsDesc,
    ...seoForPath("/contatti", locale),
  };
}

export default function ContattiPage() {
  return <ContattiPageClient />;
}
