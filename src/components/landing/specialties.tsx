import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, HeartPulse, SmilePlus } from 'lucide-react';

const specialties = [
  {
    icon: <SmilePlus className="h-12 w-12 text-primary" />,
    title: 'Ansiedade',
    description:
      'Protocolos médicos para interrupção de crises e controle da ansiedade generalizada.',
  },
  {
    icon: <HeartPulse className="h-12 w-12 text-primary" />,
    title: 'Burnout',
    description:
      'Diagnóstico clínico e manejo do esgotamento profissional crônico.',
  },
  {
    icon: <HeartPulse className="h-12 w-12 text-primary" />,
    title: 'Depressão',
    description:
      'Tratamento psiquiátrico para o resgate da estabilidade química cerebral.',
  },
  {
    icon: <BrainCircuit className="h-12 w-12 text-primary" />,
    title: 'Transtornos de Humor',
    description:
      'Mapeamento psiquiátrico para estabilização de variações bruscas de comportamento.',
  },
];

export default function Specialties() {
  return (
    <section id="specialties" className="w-full bg-[#F8F9FA] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">Especialidades</h2>
          <div className="w-20 h-1 bg-accent rounded-full mb-4" />
          <div className="max-w-[700px] text-muted-foreground text-lg md:text-xl space-y-4 text-left md:text-center">
            <p>
              Dormir exausto e acordar cansado. O peso no peito antes de começar o dia de trabalho. A mente que não desliga durante a noite e a sensação constante de que algo ruim vai acontecer. Se você está aqui, sabe exatamente como isso consome a sua energia vital.
            </p>
            <p>
              Ignorar esses sinais tem um custo alto. O estresse crônico acumulado evolui para o Burnout. A ansiedade não tratada afeta suas relações e paralisa suas decisões. A depressão rouba a vontade de fazer o que antes trazia prazer. Tentar resolver isso sozinho, ou com paliativos, apenas prolonga o sofrimento e agrava o quadro clínico.
            </p>
            <p>
              Você precisa de uma intervenção médica baseada em evidências. Como especialista com pós-graduação pelo Hospital Israelita Albert Einstein, meu papel é mapear a raiz do seu sofrimento mental, oferecer um diagnóstico exato e estabelecer um protocolo de tratamento claro. Uma conversa estruturada, sigilosa e focada em devolver o controle da sua vida.
            </p>
          </div>
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
