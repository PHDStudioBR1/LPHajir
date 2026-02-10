import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"
import './globals.css';

export const metadata: Metadata = {
  title: 'Mindful Journey | Dra. Hajir Abdalla - Psiquiatria Online',
  description: 'Psiquiatria online com Dra. Hajir Abdalla. Atendimento humanizado e especializado para sua saúde mental.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeToggle />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
