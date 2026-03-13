import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '5511977920368';

export default function UrgencySection() {
  return (
    <section className="w-full bg-primary py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-headline leading-tight max-w-2xl">
            Vagas restritas para novos acompanhamentos.
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl font-medium leading-relaxed">
            O tratamento médico exige escuta atenta e acompanhamento meticuloso. Por esse motivo, a agenda mensal possui um limite estrito de vagas para novos pacientes. Isso garante que cada consulta receba o tempo e a atenção clínica necessários.
          </p>
          <Button
            asChild
            className="bg-cta hover:bg-accent text-white font-bold text-xl px-12 py-8 h-auto rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 mt-4"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com a equipe de triagem no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
