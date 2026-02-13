import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'hajir-profile');

  return (
    <section id="home" className="w-full pt-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 py-24 relative z-10">
        <div className="flex flex-col justify-center items-center md:items-start space-y-8 text-center md:text-left">
          <div className="space-y-4 w-full">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-5xl leading-tight">
              Recupere sua paz mental e supere a ansiedade com atendimento online especializado em psiquiatria.
            </h1>
            <p className="max-w-xl text-xl text-muted-foreground font-medium leading-relaxed">
              Dra. Hajir Abdalla - Medica com atendimento em Psiquiatria e saúde mental
            </p>
          </div>

          <div className="w-full aspect-video rounded-xl bg-muted flex items-center justify-center border-2 border-primary/10 shadow-2xl relative overflow-hidden">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/ze8wf03ZL6s?rel=0&autoplay=1&mute=1&loop=1&playlist=ze8wf03ZL6s&showinfo=0&controls=1"
              title="Vídeo Dra. Hajir Abdalla"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </div>

          <Button asChild className="bg-cta hover:bg-accent text-white font-bold text-xl px-10 py-8 h-auto rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 w-full md:w-max">
            <a href="https://wa.me/5511977920368" target="_blank" rel="noopener noreferrer">
              Comece sua jornada de cura agora
            </a>
          </Button>
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
