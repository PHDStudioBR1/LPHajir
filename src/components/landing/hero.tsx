import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Hero() {
  return (
    <section id="home" className="w-full pt-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 py-24 relative z-10">
        <div className="flex flex-col justify-center items-center md:items-start space-y-8 text-center md:text-left">
          <div className="space-y-4 w-full">
            <Badge variant="secondary" className="mb-2 w-fit mx-auto md:mx-0 text-xs font-semibold uppercase tracking-wider text-primary border-primary/20 bg-primary/5">
              Pós-graduação em Psiquiatria e Saúde Mental • Hospital Israelita Albert Einstein
            </Badge>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-5xl leading-tight">
              Tratamento Médico Especializado em Ansiedade e Burnout
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
              Dra. Hajir Abdalla (Especialista Albert Einstein). Diagnóstico preciso e tratamento médico humanizado com prescrição digital.
            </p>
          </div>

          <div className="w-full aspect-video rounded-xl bg-muted flex items-center justify-center border-2 border-primary/10 shadow-2xl relative overflow-hidden">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/ze8wf03ZL6s?rel=0&autoplay=1&mute=1&loop=1&playlist=ze8wf03ZL6s&showinfo=0&controls=1"
              title="Vídeo Dra. Hajir Abdalla"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-max">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 h-auto rounded-full shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto inline-flex items-center justify-center gap-2"
            >
              <a href="/formulario">
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Falar com a Secretária
              </a>
            </Button>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Atendimento Particular com Nota Fiscal para Reembolso.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center relative">
          <div className="relative">
            <div className="absolute -inset-6 bg-accent/30 rounded-[12px] blur-3xl -z-10 animate-pulse" />
            <Image
              src="/images/dra-hajir-new.jpeg"
              alt="Dra. Hajir Abdalla - Psiquiatra"
              width={450}
              height={550}
              className="rounded-[12px] w-full max-w-[450px] object-cover shadow-2xl border-4 border-white"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
