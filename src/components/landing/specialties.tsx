import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, HeartPulse, SmilePlus } from 'lucide-react';

const specialties = [
  {
    icon: <SmilePlus className="h-12 w-12 text-primary" />,
    title: 'Ansiedade',
    description: 'Recupere sua tranquilidade com estratégias modernas e baseadas em evidências para o controle da ansiedade.',
  },
  {
    icon: <HeartPulse className="h-12 w-12 text-primary" />,
    title: 'Depressão',
    description: 'Tratamento acolhedor e especializado para superar a depressão e reconstruir sua vitalidade e alegria.',
  },
  {
    icon: <BrainCircuit className="h-12 w-12 text-primary" />,
    title: 'Transtornos de Humor',
    description: 'Abordagem focada na estabilidade emocional e equilíbrio para transtorno bipolar e outras variações de humor.',
  },
];

export default function Specialties() {
  return (
    <section id="specialties" className="w-full bg-[#F8F9FA] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">Especialidades</h2>
          <div className="w-20 h-1 bg-accent rounded-full mb-4" />
          <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
            Atendimento especializado focado nas principais demandas de saúde mental da atualidade.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-8 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <CardHeader className="items-center pb-2">
                <div className="p-4 rounded-2xl bg-primary/5 mb-4 group-hover:bg-primary/10 transition-colors">
                  {specialty.icon}
                </div>
                <CardTitle className="text-2xl font-bold font-headline text-primary">{specialty.title}</CardTitle>
              </CardHeader>
              <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                {specialty.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
