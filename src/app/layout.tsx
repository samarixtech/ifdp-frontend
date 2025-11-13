// app/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarHider from "@/components/NavbarHider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type SupportedLocale = "en" | "fr" | "es" | "ar";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<Record<string, string | string[]>>;
}) {
  const resolvedParams = params ? await params : {};
  const locale = (resolvedParams?.locale as string) || "en";

  const messages = (await import(`../components/messages/${locale}.json`))
    .default;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavbarHider>{children}</NavbarHider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
