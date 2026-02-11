import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.9-.39-2.82-.12-1.2.33-2.16 1.34-2.5 2.52-.3 1.04-.08 2.2.56 3.08.62.91 1.64 1.56 2.72 1.71 1.14.19 2.37-.15 3.23-.95.83-.75 1.25-1.84 1.25-2.95-.03-4.14-.01-8.28-.02-12.43z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row md:px-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm px-6 py-3 h-auto rounded-md shadow-md transition-transform hover:scale-105">
            <a href="https://wa.me/5511977920368" target="_blank" rel="noopener noreferrer">
              Agende sua consulta
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dra. Hajir Abdalla. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Política de Privacidade
          </Link>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/drahajirabdalla"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-foreground hover:text-primary transition-all duration-300"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/drahaabdalla/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-foreground hover:text-primary transition-all duration-300"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.tiktok.com/@drahaabdalla"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-foreground hover:text-primary transition-all duration-300"
            >
              <TikTokIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
