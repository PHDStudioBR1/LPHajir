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
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="Seu nome completo" {...field} className="pl-10" />
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
                        <FormLabel>E-mail</FormLabel>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="seu.email@exemplo.com" {...field} className="pl-10" />
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                         <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="(XX) XXXXX-XXXX" {...field} className="pl-10" />
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
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                            Autorizo o uso dos meus dados para contato comercial e envio de comunicações.
                            </FormLabel>
                             <FormMessage />
                        </div>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full" size="lg">Enviar Mensagem</Button>
                </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </section>
  )
}
