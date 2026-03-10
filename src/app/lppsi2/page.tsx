import ContactForm from '@/components/landing/contact-form';

const WHATSAPP_NUMBER = '5511977920368';

export default function Lppsi2Page() {
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

      <main className="bg-slate-50">
        <section className="mx-auto max-w-2xl px-4 py-16 space-y-8">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Você sente que sua mente não desliga nem por 1 minuto?
          </h1>
          <p className="text-xl leading-relaxed text-slate-700">
            Deita na cama exausto, mas o cérebro continua rodando listas, prazos, conversas, cobranças.
            A cada nova notificação, o peito aperta. No trabalho, você veste a armadura da produtividade.
            Em casa, o corpo começa a cobrar a conta.
          </p>
          <p className="text-xl leading-relaxed text-slate-700">
            Ignorar esses sinais transforma pequenas preocupações em crises de ansiedade, Burnout e quadros depressivos
            que roubam sua energia, sua clareza e o prazer nas coisas mais simples. E, quanto mais você tenta “aguentar”,
            mais distante parece a possibilidade de voltar a se sentir bem.
          </p>
          <p className="text-xl leading-relaxed text-slate-700">
            Você tenta seguir, engole o choro no caminho para o trabalho, responde “está tudo bem” para quem pergunta,
            mas no fundo sente que está perto do limite. E esse limite não avisa quando decide chegar.
          </p>
        </section>

        <section className="mx-auto max-w-2xl px-4 pb-16 space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">
            O próximo colapso não precisa ser o ponto de virada.
          </h2>
          <p className="text-lg leading-relaxed text-slate-700">
            Uma avaliação psiquiátrica clínica, estruturada e baseada em evidências permite identificar exatamente o que
            está por trás do seu esgotamento mental e da sua ansiedade. A partir daí, desenhamos um protocolo de tratamento
            realista, que considera sua rotina, suas responsabilidades e a necessidade de continuar performando — mas com
            saúde.
          </p>
          <p className="text-lg leading-relaxed text-slate-700">
            Se você chegou até aqui, provavelmente já percebeu que tentar resolver sozinho só prolonga a dor. O próximo passo
            é pedir ajuda profissional.
          </p>
          <div className="mt-8">
            <ContactForm notificationEmail={notificationEmail} />
          </div>
        </section>
      </main>
    </div>
  );
}

