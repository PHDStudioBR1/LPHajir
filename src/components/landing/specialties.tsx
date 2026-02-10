import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, HeartPulse, SmilePlus } from 'lucide-react';

const specialties = [
  {
    icon: <SmilePlus className="h-10 w-10 text-primary" />,
    title: 'Ansiedade e Depressão',
    description: 'Tratamento especializado para transtornos de ansiedade e depressão, visando a recuperação do seu bem-estar e qualidade de vida.',
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
    title: 'Transtornos de Humor',
    description: 'Abordagem cuidadosa para estabilização do humor, incluindo transtorno bipolar, ajudando você a encontrar equilíbrio e estabilidade emocional.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'Neurologia Comportamental',
    description: 'Foco na interface entre cérebro e comportamento para otimizar sua funcionalidade diária e promover uma saúde mental duradoura.',
  },
];

export default function Specialties() {
  return (
    <section id="specialties" className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Especialidades</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Uma abordagem clínica focada em suas necessidades, combinando funcionalidade e neurologia comportamental.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                {specialty.icon}
                <CardTitle className="mt-4 text-xl font-bold font-headline">{specialty.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2 text-base">
                {specialty.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
