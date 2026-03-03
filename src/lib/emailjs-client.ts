"use client"

import emailjs from "@emailjs/browser"

/**
 * Configuração do EmailJS (igual ao projeto phdstudio).
 * Variáveis de ambiente no Next.js: NEXT_PUBLIC_* para expor ao cliente.
 *
 * Template no EmailJS deve ter as variáveis:
 * - from_name, from_email, phone, message, reply_to
 * - email (destinatário/to_email)
 */
const getEmailJSConfig = () => ({
  serviceId:
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_EMAILJS_SERVICE_ID) ||
    "",
  templateId:
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) ||
    "",
  publicKey:
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) ||
    "",
  recipientEmail:
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_NOTIFICATION_EMAIL) ||
    "",
})

let initialized = false

export function initEmailJS(): void {
  if (typeof window === "undefined") return
  const { publicKey } = getEmailJSConfig()
  if (publicKey && !initialized) {
    try {
      emailjs.init(publicKey)
      initialized = true
    } catch {
      // Falha silenciosa; erro será tratado no envio
    }
  }
}

export type SendLeadEmailParams = {
  from_name: string
  from_email: string
  phone: string
  message?: string
  /** Destinatário; se não informado, usa NEXT_PUBLIC_NOTIFICATION_EMAIL */
  to_email?: string
}

/**
 * Envia e-mail de lead via EmailJS (mesmo fluxo do phdstudio).
 * Deve ser chamado no cliente (browser).
 */
export async function sendLeadEmail(params: SendLeadEmailParams): Promise<{
  success: boolean
  error?: string
}> {
  const config = getEmailJSConfig()
  if (!config.serviceId || !config.templateId || !config.publicKey) {
    const missing: string[] = []
    if (!config.serviceId) missing.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID")
    if (!config.templateId) missing.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID")
    if (!config.publicKey) missing.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY")
    return {
      success: false,
      error: `EmailJS não configurado. Variáveis faltando: ${missing.join(", ")}`,
    }
  }

  initEmailJS()

  const templateParams = {
    from_name: params.from_name,
    from_email: params.from_email,
    phone: params.phone,
    message: params.message || "Sem mensagem adicional",
    reply_to: params.from_email,
    email: params.to_email || config.recipientEmail || params.from_email,
  }

  try {
    await emailjs.send(config.serviceId, config.templateId, templateParams)
    return { success: true }
  } catch (err: unknown) {
    const e = err as { status?: number; text?: string; message?: string }
    let message = "Erro ao enviar e-mail via EmailJS"
    if (e?.status === 422) {
      message =
        "Parâmetros inválidos. Verifique o template EmailJS (from_name, from_email, phone, message, reply_to, email)."
    } else if (e?.text) {
      message = e.text
    } else if (e?.message) {
      message = e.message
    }
    if (typeof console !== "undefined" && console.error) {
      console.error("[EmailJS] Erro no envio:", e ?? err)
    }
    return { success: false, error: message }
  }
}
