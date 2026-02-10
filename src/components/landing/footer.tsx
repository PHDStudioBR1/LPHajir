import Link from 'next/link';
import { Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row md:px-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm px-6 py-3 h-auto rounded-md shadow-md transition-transform hover:scale-105">
            <a href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer">
              Agende sua consulta
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dra. Hajir Abdalla. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Política de Privacidade
          </Link>
          <div className="flex gap-2">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
