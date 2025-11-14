// app/layout.tsx
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";
import NavbarHider from "@/components/NavbarHider";
import { cookies } from "next/headers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

type SupportedLocale = "en" | "fr" | "es" | "ar";
const defaultLocale: SupportedLocale = "en";
const supportedLocales: SupportedLocale[] = ["en", "fr", "es", "ar"];

interface RootLayoutProps {
  children: ReactNode;
  params?: Promise<{ locale?: string; country?: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const resolvedParams = params ? await params : {};
  
  const cookieStore = cookies();
  let currentLocale: SupportedLocale = defaultLocale;

  const cookieLocale = (await cookieStore).get("NEXT_LOCALE")?.value;
  if (cookieLocale && supportedLocales.includes(cookieLocale as SupportedLocale)) {
    currentLocale = cookieLocale as SupportedLocale;
  } else if (resolvedParams?.locale && supportedLocales.includes(resolvedParams.locale as SupportedLocale)) {
    currentLocale = resolvedParams.locale as SupportedLocale;
  }

  const messages = (await import(`../components/messages/${currentLocale}.json`)).default;
  const dir = currentLocale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={currentLocale} dir={dir}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <NextIntlClientProvider locale={currentLocale} messages={messages}>
            <NavbarHider>{children}</NavbarHider>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
