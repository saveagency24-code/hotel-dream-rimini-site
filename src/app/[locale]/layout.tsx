import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import StructuredData from "@/components/seo/StructuredData";
import { getHotelSchema, getOrganizationSchema } from "@/lib/geo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const meta = messages.meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    icons: {
      icon: "/images/logo-v3.png",
      apple: "/images/logo-v3.png",
      shortcut: "/images/logo-v3.png",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        it: "/it",
        en: "/en",
        de: "/de",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "it" ? "it_IT" : locale === "de" ? "de_DE" : "en_US",
      type: "website",
      siteName: "Hotel Dream Rimini",
      url: `${SITE_URL}/${locale}`,
      images: [
        {
          url: "/images/hotel-esterno-notte.png",
          width: 1200,
          height: 630,
          alt: "Hotel Dream Rimini",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/images/hotel-esterno-notte.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <StructuredData data={getOrganizationSchema()} />
      <StructuredData data={getHotelSchema(locale as "it" | "en" | "de")} />
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
