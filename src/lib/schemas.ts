import * as z from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  whatsapp: z.string().min(10, {
    message: "Por favor, insira um número de WhatsApp válido.",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Você deve autorizar o uso dos seus dados.",
  }),
})
