import { Resend } from "resend"

export type LeadNotificationData = {
    name: string
    email: string
    message: string
}

/**
 * Envia e-mail de notificação quando um novo lead é criado no formulário.
 * Usa Resend (resend.com). Configure RESEND_API_KEY no ambiente.
 * Para testes, use "onboarding@resend.dev" como from (domínio verificado do Resend).
 */
export async function sendLeadNotification(
    to: string,
    data: LeadNotificationData,
): Promise<{ success: boolean; error?: string }> {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        console.warn("RESEND_API_KEY não configurado. E-mail não enviado.")
        return { success: false, error: "RESEND_API_KEY não configurado" }
    }

    const from = process.env.RESEND_FROM_EMAIL || "Hajir Site <onboarding@resend.dev>"

    const resend = new Resend(apiKey)

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Novo Lead</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2563eb;">Novo lead do formulário do site</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; font-weight: bold;">Nome:</td><td>${escapeHtml(data.name)}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">E-mail:</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Mensagem:</td><td style="white-space: pre-wrap;">${escapeHtml(data.message)}</td></tr>
  </table>
  <p style="margin-top: 24px; font-size: 12px; color: #666;">Enviado automaticamente pelo formulário de contato.</p>
</body>
</html>
`.trim()

    const { data: result, error } = await resend.emails.send({
        from,
        to: [to],
        subject: `[Hajir] Novo lead: ${data.name}`,
        html,
    })

    if (error) {
        console.error("Erro ao enviar e-mail via Resend:", error)
        return { success: false, error: String(error) }
    }

    console.log(`E-mail de lead enviado para ${to}, id: ${result?.id}`)
    return { success: true }
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}
