"use client"

import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 1,
    name: "Juliana S.",
    avatarId: "testimonial-avatar-1",
    text: "A Dra. Hajir foi um divisor de águas na minha vida. O atendimento online facilitou tudo e sua abordagem humana me fez sentir segura e compreendida desde o primeiro dia."
  },
  {
    id: 2,
    name: "Marcos P.",
    avatarId: "testimonial-avatar-2",
    text: "Eu estava cético sobre terapia online, mas a Dra. Hajir é tão profissional e atenciosa que a distância desaparece. Recomendo a todos que buscam ajuda de verdade."
  },
  {
    id: 3,
    name: "Carla M.",
    avatarId: "testimonial-avatar-3",
    text: "Encontrei na Dra. Hajir o suporte que eu precisava para lidar com minha ansiedade. As sessões são meu porto seguro e estou evoluindo a cada semana."
  },
  {
    id: 4,
    name: "Ricardo L.",
    avatarId: "testimonial-avatar-1",
    text: "Profissionalismo impecável e uma capacidade incrível de escuta. A Dra. Hajir me ajudou a entender e a gerenciar meu transtorno de humor como ninguém antes."
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <span className="text-4xl font-bold text-primary mb-2">+ 1.500</span>
            <span className="text-muted-foreground font-medium">
              Mais de 1.500 pacientes atendidos em todo o Brasil.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <span className="text-4xl font-bold text-primary mb-2">95%</span>
            <span className="text-muted-foreground font-medium">
              95% dos pacientes relatam eficácia clínica e melhora dos sintomas.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <span className="text-2xl font-bold text-primary mb-2 text-center">
              Nota Fiscal para reembolso
            </span>
            <span className="text-muted-foreground font-medium text-center">
              Emissão de Nota Fiscal para processos de reembolso no seu convênio médico.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center">
            <span className="text-2xl font-bold text-primary mb-2 text-center">
              Certificação digital nacional
            </span>
            <span className="text-muted-foreground font-medium text-center">
              Documentos e receitas controladas emitidas com certificação digital nacional.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">O que meus pacientes dizem</h2>
          <div className="w-20 h-1 bg-accent rounded-full mb-4" />
          <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
            Depoimentos de pessoas que transformaram suas vidas com suporte profissional.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const avatarImage = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
              return (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full shadow-md">
                      <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                        <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                        <div className="flex items-center gap-4 mt-4">
                          <Avatar>
                            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={avatarImage.description} data-ai-hint={avatarImage.imageHint} />}
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            }
            )}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        <div className="mt-16 flex justify-center">
          <Button
            asChild
            className="group relative bg-green-600 hover:bg-green-500 text-white font-bold text-xl px-12 py-8 h-auto rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <a href="/#contact" className="inline-flex items-center gap-2">
              <span className="absolute inset-0 -z-10 rounded-full bg-green-600/40 blur-xl opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100 animate-pulse" />
              Reserve sua vaga hoje
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
