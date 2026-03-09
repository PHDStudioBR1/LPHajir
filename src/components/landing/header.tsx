import { Logo } from '@/components/landing/logo';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto flex h-20 items-center justify-center px-4 md:px-6">
        <Logo />
      </div>
    </header>
  );
}
