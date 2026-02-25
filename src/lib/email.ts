export type LeadNotificationData = {
    name: string
    email: string
    message: string
}

/**
 * Envia e-mail de notificação quando um novo lead é criado no formulário.
 * Usa Web3Forms (https://web3forms.com). Configure CONTACT_FORM_KEY no ambiente.
 */
export async function sendLeadNotification(
    to: string,
    data: LeadNotificationData,
): Promise<{ success: boolean; error?: string }> {
    const accessKey = process.env.CONTACT_FORM_KEY
    if (!accessKey) {
        console.warn("CONTACT_FORM_KEY não configurado. E-mail não enviado.")
        return { success: false, error: "CONTACT_FORM_KEY não configurado" }
    }

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

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: accessKey,
                subject: `[Hajir] Novo lead: ${data.name}`,
                email: data.email,
                name: data.name,
                message: data.message,
                to,
                html,
            }),
        })

        if (!response.ok) {
            const errorText = await safeReadText(response)
            console.error(
                "Erro ao enviar e-mail via Web3Forms (HTTP):",
                response.status,
                errorText,
            )
            return { success: false, error: `HTTP ${response.status}` }
        }

        const json = await safeReadJson(response)
        if (json && json.success === false) {
            console.error("Erro ao enviar e-mail via Web3Forms (payload):", json)
            return { success: false, error: json.message ?? "Erro Web3Forms" }
        }

        console.log(`E-mail de lead enviado via Web3Forms para ${to}`)
        return { success: true }
    } catch (error) {
        console.error("Erro ao enviar e-mail via Web3Forms:", error)
        return { success: false, error: String(error) }
    }
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

async function safeReadText(response: Response): Promise<string> {
    try {
        return await response.text()
    } catch {
        return ""
    }
}

async function safeReadJson(response: Response): Promise<any | null> {
    try {
        return await response.json()
    } catch {
        return null
    }
}
