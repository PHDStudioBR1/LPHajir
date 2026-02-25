import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/landing/header"
import ContactForm from "@/components/landing/contact-form"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Solicitar Contato | Dra. Hajir Abdalla",
  description: "Preencha o formulário e entraremos em contato em breve.",
}

export default function FormularioPage() {
  const web3FormsKey = process.env.CONTACT_FORM_KEY;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-4 -ml-2 text-muted-foreground hover:text-primary"
          >
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Link>
          </Button>
          <ContactForm web3FormsKey={web3FormsKey} />
        </div>
      </main>
    </div>
  )
}
