import ContactForm from '@/components/landing/contact-form';
import { Moon, Compass, HeartPulse, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '5511977920368';

export default function Lppsi4Page() {
  const notificationEmail = process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL ?? undefined;

  const bullets = [
    'Volte a dormir a noite inteira, sem acordar cansado como se não tivesse descansado.',
    'Retome o controle das suas decisões, sem que a ansiedade paralise cada escolha importante.',
    'Reduza crises de pânico e taquicardia em situações de pressão e exposição.',
    'Reconstrua sua energia mental para entregar resultados sem se destruir no processo.',
    'Receba sua receita digital em qualquer lugar do Brasil sem sair de casa.',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="text-lg font-bold tracking-tight text-slate-900">
            Clínica Psiquiátrica Online – Dra. Hajir
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

      <main className="container mx-auto px-4 py-16 space-y-20">
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] md:items-center">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Tratamento psiquiátrico focado em devolver sua vida ao eixo.
            </h1>
            <p className="text-lg text-slate-700">
              Atendimento online para ansiedade, Burnout e crises de pânico com condução clínica especializada e foco em
              resultado prático: voltar a funcionar bem no trabalho e na vida pessoal.
            </p>
            <div className="space-y-3">
              {bullets.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                    ✓
                  </span>
                  <p className="text-sm md:text-base text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <ContactForm notificationEmail={notificationEmail} />
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-white p-6 shadow-lg border border-slate-100">
            <Moon className="w-12 h-12 text-emerald-500" />
            <h2 className="text-lg font-semibold text-slate-900">Volte a dormir profundamente</h2>
            <p className="text-sm text-slate-700">
              Redução de despertares noturnos, melhora da qualidade do sono e da sensação de descanso ao acordar.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-white p-6 shadow-lg border border-slate-100">
            <Compass className="w-12 h-12 text-emerald-500" />
            <h2 className="text-lg font-semibold text-slate-900">Retome o controle das decisões</h2>
            <p className="text-sm text-slate-700">
              Clareza mental para decidir sem ser dominado por medo, procrastinação ou crises de ansiedade.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-white p-6 shadow-lg border border-slate-100">
            <HeartPulse className="w-12 h-12 text-emerald-500" />
            <h2 className="text-lg font-semibold text-slate-900">Estabilize corpo e emoções</h2>
            <p className="text-sm text-slate-700">
              Manejo médico dos sintomas físicos e emocionais para que seu corpo pare de “gritar” o tempo todo.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            <h2 className="text-2xl font-bold text-slate-900">
              Um próximo passo simples para uma mudança profunda.
            </h2>
            <p className="max-w-2xl text-sm md:text-base text-slate-700">
              Preencha seus dados para agendar uma avaliação psiquiátrica online e receber um plano de tratamento estruturado
              para a sua realidade.
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <ContactForm notificationEmail={notificationEmail} />
          </div>
        </section>
      </main>
    </div>
  );
}

