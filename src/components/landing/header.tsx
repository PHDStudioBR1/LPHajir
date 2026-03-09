import Link from 'next/link';

const LOGO_SRC =
  'https://raw.githubusercontent.com/PHDStudioBR1/Hajer/main/Logo%20Site.svg';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto flex h-20 items-center justify-center px-4 md:px-6">
        <Link href="/" className="flex items-center" aria-label="Dra. Hajir Abdalla - início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt="Dra. Hajir Abdalla"
            className="h-10 md:h-12 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
