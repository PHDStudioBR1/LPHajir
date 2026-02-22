import * as z from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  phone: z
    .string()
    .min(10, "Por favor, insira um número de WhatsApp válido.")
    .refine((val) => {
      const digits = val.replace(/\D/g, "")
      return digits.length >= 10 && digits.length <= 13
    }, {
      message: "Por favor, insira um número válido (ex: 11 99999-9999).",
    }),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Você deve autorizar o uso dos seus dados.",
  }),
})
