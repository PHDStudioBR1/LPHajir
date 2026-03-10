import ContactForm from '@/components/landing/contact-form';

const WHATSAPP_NUMBER = '5511977920368';

export default function Lppsi3Page() {
  const notificationEmail = process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL ?? undefined;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="text-lg font-bold tracking-tight text-slate-50">
            Psiquiatria Clínica • Dra. Hajir Abdalla
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg hover:bg-emerald-400 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 space-y-16">
        <section className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Psiquiatria de excelência com diagnóstico preciso e manejo avançado.
          </h1>
          <p className="text-lg text-slate-700">
            Avaliação psiquiátrica online para ansiedade, Burnout e transtornos de humor, com protocolos baseados em medicina
            baseada em evidências e pós-graduação pelo Hospital Israelita Albert Einstein.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 text-slate-50 p-8 shadow-xl border border-slate-800 text-center">
            <div className="text-3xl font-extrabold mb-2">+1.500</div>
            <p className="text-sm text-slate-300">
              Pacientes atendidos em todo o Brasil em contexto de alta exigência profissional.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900 text-slate-50 p-8 shadow-xl border border-slate-800 text-center">
            <div className="text-3xl font-extrabold mb-2">95%</div>
            <p className="text-sm text-slate-300">
              Relatam eficácia clínica e melhora consistente dos sintomas ao longo do acompanhamento.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900 text-slate-50 p-8 shadow-xl border border-slate-800 text-center">
            <div className="text-lg font-extrabold mb-2">
              Protocolos Albert Einstein
            </div>
            <p className="text-sm text-slate-300">
              Conduta fundamentada em diretrizes atualizadas e formação de excelência em psiquiatria.
            </p>
          </div>
        </section>

        <section className="space-y-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
              <p className="text-sm text-slate-600 italic">
                “Eu vivia em modo automático, entre reuniões e crises silenciosas de pânico. O tratamento me devolveu clareza
                e estabilidade para tomar decisões importantes sem sentir que ia desmoronar.”
              </p>
              <p className="mt-4 text-xs font-semibold text-slate-500">Paciente em tratamento para ansiedade corporativa</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
              <p className="text-sm text-slate-600 italic">
                “Cheguei no limite do Burnout. Hoje, consigo trabalhar, descansar e estar presente com a minha família sem
                culpa constante ou exaustão extrema.”
              </p>
              <p className="mt-4 text-xs font-semibold text-slate-500">Paciente em acompanhamento para esgotamento profissional</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
              <p className="text-sm text-slate-600 italic">
                “Entender o que acontecia com meu humor e ajustar o tratamento mudou completamente a forma como eu lido com
                pressão e mudanças no trabalho.”
              </p>
              <p className="mt-4 text-xs font-semibold text-slate-500">Paciente em tratamento para transtorno de humor</p>
            </div>
          </div>

          <section className="mx-auto max-w-2xl">
            <ContactForm notificationEmail={notificationEmail} />
          </section>
        </section>
      </main>
    </div>
  );
}

