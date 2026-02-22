"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, Loader2, Mail, User } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { submitContactForm } from "@/lib/actions"
import { contactFormSchema } from "@/lib/schemas"
import { applyPhoneMask } from "@/lib/phone-utils"

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
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
          title: "Não foi possível enviar",
          description: "Verifique sua conexão e tente novamente. Se o problema persistir, entre em contato pelo WhatsApp.",
        });
      }
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Ocorreu um erro inesperado. Tente novamente ou entre em contato pelo WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
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
          <CardContent className="relative">
            {isSubmitting && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">Processando sua mensagem...</p>
                <p className="mt-1 text-xs text-muted-foreground">Aguarde um momento</p>
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Nome</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 z-10" />
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} className="pl-10 border-primary/10 focus:border-primary bg-background text-foreground" />
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
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 z-10" />
                          <FormControl>
                            <Input placeholder="seu@email.com" {...field} className="pl-10 border-primary/10 focus:border-primary bg-background text-foreground" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              type="tel"
                              className="pl-3 border-primary/10 focus:border-primary bg-background text-foreground"
                              value={field.value}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              onChange={(e) => field.onChange(applyPhoneMask(e.target.value))}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold">Mensagem / Observação</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Como posso te ajudar?"
                          {...field}
                          className="min-h-[120px] border-primary/10 focus:ring-primary bg-white dark:bg-zinc-900 border border-input text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500"
                        />
                      </FormControl>
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cta hover:bg-accent text-white font-bold h-auto py-4 rounded-full shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
