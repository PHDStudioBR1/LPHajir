import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'hajir-profile');

  return (
    <section id="home" className="w-full pt-20 bg-background">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div className="flex flex-col items-start space-y-6">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Sua jornada para o bem-estar mental começa aqui
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Sou médica especializada em psiquiatria e saúde mental. Ofereço atendimento online para ajudar você a superar desafios emocionais.
          </p>
          <Button asChild size="lg">
            <a href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer">
              Agende sua consulta
            </a>
          </Button>
        </div>
        <div className="flex justify-center">
          {profileImage && (
             <Image
              src={profileImage.imageUrl}
              alt={profileImage.description}
              width={400}
              height={400}
              className="rounded-full aspect-square object-cover shadow-2xl"
              data-ai-hint={profileImage.imageHint}
            />
          )}
        </div>
      </div>
    </section>
  );
}
