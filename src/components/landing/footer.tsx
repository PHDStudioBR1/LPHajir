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
    <footer className="w-full bg-primary py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col space-y-6">
            <Link href="/" className="text-2xl font-bold font-headline text-white tracking-tight">
              Dra. Hajir Abdalla
            </Link>
            <p className="text-white/70 max-w-xs">
              Especialista em psiquiatria e saúde mental, oferecendo suporte especializado com empatia e acolhimento.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/drahajirabdalla" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/drahaabdalla/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@drahaabdalla" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg text-white">Links Úteis</h3>
            <Link href="https://drahaabdalla.com" className="text-white/70 hover:text-accent transition-colors">Site Oficial</Link>
            <Link href="#specialties" className="text-white/70 hover:text-accent transition-colors">Especialidades</Link>
            <Link href="#testimonials" className="text-white/70 hover:text-accent transition-colors">Depoimentos</Link>
            <button className="text-left text-white/70 hover:text-accent transition-colors">Política de Privacidade</button>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="font-bold text-lg text-white">Agende agora</h3>
            <Button asChild className="bg-cta hover:bg-accent text-white font-bold h-auto py-4 rounded-full transition-all">
              <a href="https://wa.me/5511977920368" target="_blank" rel="noopener noreferrer">
                Comece sua jornada hoje
              </a>
            </Button>
            <p className="text-sm text-white/50">
              Atendimento Online disponível para todo o Brasil.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Dra. Hajir Abdalla. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
