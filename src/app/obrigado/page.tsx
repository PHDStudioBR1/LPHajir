"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getUtmFromStorage } from "@/lib/gtm"

const WHATSAPP_NUMBER = "5511977920368"
const WHATSAPP_MESSAGE = "Olá! Preenchi o formulário no site e gostaria de dar seguimento ao meu atendimento."
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
const REDIRECT_DELAY_MS = 5000

/** Evento de visualização da página de obrigado (conversão já disparada no submit do formulário como generate_lead). */
const GTM_OBRIGADO_EVENT = "page_view_obrigado"

export default function ObrigadoPage() {
  useEffect(() => {
    if (typeof window === "undefined") return

    if (window.dataLayer) {
      const utm = getUtmFromStorage()
      window.dataLayer.push({
        event: GTM_OBRIGADO_EVENT,
        ...utm,
      })
    }

    const t = setTimeout(() => {
      window.location.href = WHATSAPP_URL
    }, REDIRECT_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <div className="mx-auto max-w-lg text-center space-y-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
            Os seus dados foram recebidos com sucesso e estão seguros.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-semibold">
            Será redirecionado para o nosso WhatsApp em poucos segundos para falar com a nossa equipa...
          </p>
        </div>
        <p className="text-sm md:text-base text-muted-foreground">
          Não quer esperar? Use o botão abaixo para ir agora.
        </p>
        <Button
          id="whatsapp-manual-fallback"
          asChild
          className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6 h-auto rounded-full shadow-lg"
          size="lg"
        >
          <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Ir para o WhatsApp agora
          </Link>
        </Button>
      </div>
    </div>
  )
}
