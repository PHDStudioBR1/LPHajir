/**
 * @deprecated Envio de e-mail migrado para EmailJS no cliente (src/lib/emailjs-client.ts).
 * Este módulo não é mais usado; mantido apenas por compatibilidade.
 */
export type LeadNotificationData = {
    name: string
    email: string
    message: string
}

export async function sendLeadNotification(
    to: string,
    data: LeadNotificationData,
): Promise<{ success: boolean; error?: string }> {
    const accessKey =
        process.env.CONTACT_FORM_KEY || process.env.NEXT_PUBLIC_CONTACT_FORM_KEY

    if (!accessKey) {
        const error =
            "CONTACT_FORM_KEY não configurado. Configure a chave do Web3Forms para envio de e-mail."
        console.error(error, {
            to,
            name: data.name,
            email: data.email,
        })
        return { success: false, error }
    }

    try {
        const payload = {
            access_key: accessKey,
            subject: `[Hajir] Novo lead: ${data.name}`,
            email: data.email,
            name: data.name,
            message: data.message,
            to,
        }

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        })

        const status = response.status
        const textBody = await safeReadText(response)
        const jsonBody = await safeReadJson(response)

        if (!response.ok) {
            console.error("Erro ao enviar e-mail via Web3Forms (HTTP):", status, textBody)
            return {
                success: false,
                error: `Web3Forms HTTP ${status}`,
            }
        }

        const successFlag =
            (jsonBody && (jsonBody.success === true || jsonBody.status === "success")) ||
            false

        if (!successFlag) {
            console.error("Resposta inesperada do Web3Forms:", jsonBody || textBody)
            return {
                success: false,
                error: "Resposta inesperada do Web3Forms",
            }
        }

        console.log("E-mail de lead enviado via Web3Forms com sucesso para:", to, {
            name: data.name,
            email: data.email,
        })

        return { success: true }
    } catch (err) {
        console.error("Erro ao enviar e-mail via Web3Forms:", err, {
            to,
            name: data.name,
            email: data.email,
        })
        return { success: false, error: "Erro ao enviar e-mail via Web3Forms" }
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
