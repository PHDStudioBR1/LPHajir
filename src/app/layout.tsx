import type { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import { Alegreya, PT_Sans } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import { UtmTracker } from '@/components/analytics/utm-tracker';
import './globals.css';

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-alegreya',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: 'Dra. Hajir Abdalla - Psiquiatria Online',
  description: 'Psiquiatria online com Dra. Hajir Abdalla. Atendimento humanizado e especializado para sua saúde mental.',
  verification: {
    google: 'h8oY6MAoigKMznqyR4czmPLX_ylOfkPmz-Tp1Uqw4mQ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`!scroll-smooth ${alegreya.variable} ${ptSans.variable}`}>
      <GoogleTagManager gtmId="GTM-MW74TJC9" />
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=1" />
        <link rel="shortcut icon" href="/favicon.png?v=1" type="image/png" />
      </head>
      <body className="font-body antialiased min-h-screen">
        {/* Fallback GTM quando JavaScript está desabilitado */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MW74TJC9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Toaster />
        <UtmTracker />
      </body>
    </html>
  );
}
