import { Gilda_Display, Inder } from "next/font/google";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import TrackingScripts from "@/components/analytics/TrackingScripts";
import "./globals.css";

const gildaDisplay = Gilda_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inder = Inder({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${gildaDisplay.variable} ${inder.variable} antialiased`}>
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
