"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_URL = "https://wa.me/5511977920368"
const REDIRECT_DELAY_MS = 2000

export default function ObrigadoPage() {
  useEffect(() => {
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
        <div className="space-y-3">
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-primary">
            Sua mensagem foi recebida com sucesso!
          </h1>
          <p className="text-muted-foreground text-lg">
            Redirecionando para o WhatsApp...
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Se não for redirecionado em alguns segundos, use o botão abaixo.
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
