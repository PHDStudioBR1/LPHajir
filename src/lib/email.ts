export type LeadNotificationData = {
    name: string
    email: string
    message: string
}

export async function sendLeadNotification(
    to: string,
    data: LeadNotificationData,
): Promise<{ success: boolean; error?: string }> {
    console.log("Lead recebido para notificação (stub server-side):", {
        to,
        name: data.name,
        email: data.email,
    })
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
