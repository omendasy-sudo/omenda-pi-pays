import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { PiAuthProvider } from "@/components/PiAuthProvider";
import { NavBar } from "@/components/NavBar";
import { I18nProvider } from "@/lib/i18n";
import { FooterTranslated } from "@/components/FooterTranslated";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GcvProvider } from "@/components/GcvProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omendapipaysglobel.online"),
  title: "Omenda Pi Pays Global | Pi Marketplace & Services",
  description: "Buy, sell, and pay for services using Pi cryptocurrency. Omenda Pi Pays Global supports hotels, homes, bills, transport, and social commerce.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Omenda Pi Pays Global | Pi Marketplace & Services",
    description: "Buy, sell, and pay for services using Pi cryptocurrency.",
    url: "https://omendapipaysglobel.online",
    siteName: "Omenda Pi Pays Global",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omenda Pi Pays Global",
    description: "Buy, sell, and pay with Pi cryptocurrency.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("omenda_theme")||"dark";document.documentElement.className=t;}catch(e){}})();` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
        <GcvProvider>
        <PiAuthProvider>
        <I18nProvider>
        <NavBar />
        {children}
        <FooterTranslated />
        </I18nProvider>
        </PiAuthProvider>
        </GcvProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
