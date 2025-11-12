import {NextIntlClientProvider} from 'next-intl';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type SupportedLocale = 'en' | 'fr' | 'es' | 'ar';


export default async function RootLayout({
  children,
  params, // params.locale if using dynamic routing
}: {
  children: React.ReactNode;
  params?: { locale: string };
}) {
  const locale = params?.locale || 'en';
  const messages = (await import(`../components/messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


