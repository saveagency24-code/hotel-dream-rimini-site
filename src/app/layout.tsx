import type { Metadata } from "next";
import { Gilda_Display, Inder } from "next/font/google";
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
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${gildaDisplay.variable} ${inder.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
