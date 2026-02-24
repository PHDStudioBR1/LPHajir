import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Obrigado | Dra. Hajir Abdalla",
  description: "Sua mensagem foi recebida. Redirecionando para o WhatsApp.",
  robots: "noindex, nofollow",
}

export default function ObrigadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
