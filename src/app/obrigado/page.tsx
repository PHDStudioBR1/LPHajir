"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_URL = "https://wa.me/5511977920368"
const REDIRECT_DELAY_MS = 2000

/** Evento enviado ao GTM para disparar conversão/lead na página de obrigado (SPA). */
const GTM_OBRIGADO_EVENT = "page_view_obrigado"

export default function ObrigadoPage() {
  useEffect(() => {
    // Dispara evento para o GTM (tags de conversão Google Ads + GA4 generate_lead)
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: GTM_OBRIGADO_EVENT })
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
            Tudo certo! Sua mensagem foi enviada.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-semibold">
            Por favor, aguarde alguns segundos: você será redirecionado automaticamente para o atendimento da
            equipe pelo WhatsApp.
          </p>
        </div>
        <p className="text-sm md:text-base text-muted-foreground">
          Se o redirecionamento não acontecer, use o botão abaixo para falar com nossa equipe agora mesmo.
        </p>
        <Button
          id="whatsapp-manual-fallback"
          asChild
          className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6 h-auto rounded-full shadow-lg"
          size="lg"
        >
          <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Clique aqui se o seu WhatsApp não abriu
          </Link>
        </Button>
      </div>
    </div>
  )
}
