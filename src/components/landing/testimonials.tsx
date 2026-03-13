"use client"

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
            <span className="text-2xl font-bold text-primary mb-2 text-center">
              Protocolos em evidências
            </span>
            <span className="text-muted-foreground font-medium">
              Atendimento com protocolos médicos atualizados e baseados em evidências.
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

      </div>
    </section>
  )
}
