import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto grid grid-cols-3 h-20 items-center px-4 md:px-6">
        <div className="flex justify-start">
          <Link href="/" className="text-2xl font-bold font-headline text-primary">
            Dra. Hajir Abdalla
          </Link>
        </div>
        <div className="flex justify-center">
          <Button asChild>
            <a href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer">
              Agende sua consulta
            </a>
          </Button>
        </div>
        <div />
      </div>
    </header>
  );
}
