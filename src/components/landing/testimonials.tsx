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
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-foreground">O que meus pacientes dizem</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
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
        <div className="mt-12 flex justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-10 py-6 h-auto rounded-md shadow-lg transition-transform hover:scale-105">
            <a href="https://wa.me/5511977920368" target="_blank" rel="noopener noreferrer">
              Agende sua consulta
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
