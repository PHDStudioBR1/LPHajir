import ContactForm from '@/components/landing/contact-form';

const WHATSAPP_NUMBER = '5511977920368';

export default function Lppsi1Page() {
  const notificationEmail = process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL ?? undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="text-lg font-bold tracking-tight text-slate-900">
            Dra. Hajir Abdalla
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:bg-green-500 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-2 md:items-start">
        <section className="space-y-6 md:pr-8">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Agende sua avaliação psiquiátrica online.
          </h1>
          <p className="text-lg text-slate-700">
            Protocolos médicos baseados em evidências, formados pelo Hospital Israelita Albert Einstein,
            para tratamento de ansiedade intensa, burnout e crises de pânico em adultos em alta demanda profissional.
          </p>
          <ul className="space-y-3 text-sm text-slate-700">
            <li>• Diagnóstico clínico detalhado em consulta por vídeo.</li>
            <li>• Tratamento estruturado com acompanhamento próximo.</li>
            <li>• Receita digital válida em todo o território nacional.</li>
          </ul>
        </section>

        <section
          aria-label="Formulário de agendamento prioritário"
          className="md:sticky md:top-28"
        >
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 px-6 py-4">
              <p className="text-sm font-semibold text-slate-900">
                Priorize seu horário de avaliação
              </p>
              <p className="text-xs text-slate-500">
                Responda com atenção. Nossa equipe retornará para finalizar o agendamento.
              </p>
            </div>
            <div className="px-4 py-4">
              <ContactForm notificationEmail={notificationEmail} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

