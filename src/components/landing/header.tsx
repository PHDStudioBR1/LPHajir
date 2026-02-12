import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold font-headline text-primary tracking-tight">
          Dra. Hajir Abdalla
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild className="bg-cta hover:bg-accent text-white font-bold transition-all duration-300">
            <a href="https://wa.me/5511977920368" target="_blank" rel="noopener noreferrer">
              Agende sua consulta
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
