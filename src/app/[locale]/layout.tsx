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
  await params;

  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: "/images/logo-v3.png",
      apple: "/images/logo-v3.png",
      shortcut: "/images/logo-v3.png",
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
