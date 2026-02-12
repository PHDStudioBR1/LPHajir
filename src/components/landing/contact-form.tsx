"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, Mail, User, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { submitContactForm } from "@/lib/actions"
import { contactFormSchema } from "@/lib/schemas"

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      consent: false,
    },
  })

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const result = await submitContactForm(values);
    if (result.success) {
      toast({
        title: `Obrigado, ${result.name}!`,
        description: "Sua mensagem foi enviada. Entrarei em contato em breve.",
        action: <Check className="h-5 w-5 text-green-500" />,
      })
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Algo deu errado",
        description: "Não foi possível enviar sua mensagem. Tente novamente.",
      });
    }
  }

  return (
    <section id="contact" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline font-bold">Entre em Contato</CardTitle>
            <CardDescription>
              Prefere enviar uma mensagem? Preencha o formulário abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Nome</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} className="pl-10 border-primary/10 focus:border-primary" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">E-mail</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                          <FormControl>
                            <Input placeholder="seu@email.com" {...field} className="pl-10 border-primary/10 focus:border-primary" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold">Mensagem / Observação</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <textarea
                            placeholder="Como posso te ajudar?"
                            {...field}
                            className="w-full min-h-[120px] rounded-md border border-primary/10 p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-cta hover:bg-accent text-white font-bold h-auto py-4 rounded-full shadow-lg" size="lg">
                  Enviar Mensagem
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
