import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

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
    <html lang="en" className="!scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MW74TJC9');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) - GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8SDRDH7QCQ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8SDRDH7QCQ');
            `,
          }}
        />
        {/* End Google tag (gtag.js) */}
        <link rel="icon" type="image/png" href="/favicon.png?v=1" />
        <link rel="shortcut icon" href="/favicon.png?v=1" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MW74TJC9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
