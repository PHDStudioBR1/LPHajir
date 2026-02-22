"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, Mail, User } from "lucide-react"

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
import { applyPhoneMask } from "@/lib/phone-utils"

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold">WhatsApp</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="(11) 99999-9999"
                            className="pl-10 border-primary/10 focus:border-primary"
                            {...field}
                            onChange={(e) => field.onChange(applyPhoneMask(e.target.value))}
                          />
                        </FormControl>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold">Mensagem / Observação</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <textarea
                            placeholder="Como posso te ajudar?"
                            {...field}
                            className="w-full min-h-[120px] rounded-md border border-primary/10 p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Autorizo o uso dos meus dados para retorno de contato.
                        </FormLabel>
                        <FormMessage />
                      </div>
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
