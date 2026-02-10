import { Button } from '@/components/ui/button';

export default function Cta() {
  return (
    <section id="cta" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
        <h2 className="max-w-2xl font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pronto para dar o primeiro passo?
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Agende sua consulta psiquiátrica e inicie sua jornada de cura com suporte profissional especializado. Estou aqui para ajudar você.
        </p>
        <Button size="lg" asChild>
          <a href="https://wa.me/5511977920368" target="_blank" rel="noopener noreferrer">
            Agende sua consulta agora
          </a>
        </Button>
      </div>
    </section>
  );
}
