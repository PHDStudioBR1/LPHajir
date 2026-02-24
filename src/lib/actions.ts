"use server"

import * as z from "zod"
import { contactFormSchema } from "./schemas"
import { sendLeadNotification } from "./email"
import { formatPhoneForApi } from "./phone-utils"

const FETCH_TIMEOUT_MS = 20000 // 20s por requisição - evita travar se CRM/Resend lentos

async function fetchWithTimeout(
    url: string,
    options: RequestInit & { timeout?: number } = {},
): Promise<Response> {
    const { timeout = FETCH_TIMEOUT_MS, ...fetchOpts } = options
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    const res = await fetch(url, { ...fetchOpts, signal: controller.signal })
    clearTimeout(id)
    return res
}

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
    const CRM_BASE = process.env.CRM_BASE_URL || "https://phdcrm.546digitalservices.com"
    const CRM_API = `${CRM_BASE.replace(/\/$/, "")}/api/crm/v1`
    const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL || "drahaabdalla@gmail.com"
    const ENABLE_CRM = process.env.ENABLE_CRM === "true"

    // 1) E-mail primeiro (mais rápido, garante que não perdemos o lead)
    const emailResult = await sendLeadNotification(TARGET_EMAIL, {
        name: data.name,
        email: data.email,
        message: `${data.message ?? ""}\n\nWhatsApp: ${data.phone}`,
    })

    if (!ENABLE_CRM) {
        if (!emailResult.success) {
            console.error(
                "Falha ao enviar e-mail de lead via Resend. Verifique RESEND_API_KEY/RESEND_FROM_EMAIL. Prosseguindo para não travar o formulário.",
            )
        }
        return { success: true, name: data.name }
    }

    try {
        // 2) Login no CRM
        const loginRes = await fetchWithTimeout(`${CRM_API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: process.env.CRM_ADMIN_EMAIL || "admin@hajir",
                password: process.env.CRM_ADMIN_PASSWORD || "admin123",
                tenant_slug: process.env.CRM_TENANT_SLUG || "hajir",
            }),
        })

        if (!loginRes.ok) {
            const errText = await loginRes.text()
            console.error("CRM login failed:", loginRes.status, errText)
            throw new Error(`CRM login failed: ${loginRes.status}`)
        }

        const loginData = (await loginRes.json()) as { data?: { accessToken?: string } }
        const accessToken = loginData.data?.accessToken
        if (!accessToken) {
            throw new Error("CRM login: no data.accessToken in response")
        }

        // 3) Criar Lead
        const leadRes = await fetchWithTimeout(`${CRM_API}/leads`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                email: data.email,
                first_name: data.name,
                phone: formatPhoneForApi(data.phone),
                custom_values: {
                    observacao: data.message ?? "",
                },
            }),
        })

        if (!leadRes.ok) {
            const errBody = await leadRes.text()
            console.error("CRM create lead failed:", leadRes.status, errBody)
            throw new Error(`CRM create lead failed: ${leadRes.status}`)
        }

        const leadData = (await leadRes.json()) as { data?: { id?: number } }
        const LEAD_ID = leadData.data?.id
        if (LEAD_ID == null) {
            console.error("CRM create lead: no id in response", leadData)
            throw new Error("CRM create lead: no lead id")
        }

        // 4) Criar Atividade
        const activityRes = await fetchWithTimeout(`${CRM_API}/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                lead_id: LEAD_ID,
                user_id: parseInt(process.env.CRM_USER_ID || "1", 10),
                type: "call",
                title: "Entrar em contato com o lead",
                description: "Retornar contato do formulário do site.",
                due_date: new Date(Date.now() + 86400000).toISOString(),
            }),
        })

        if (!activityRes.ok) {
            const errBody = await activityRes.text()
            console.error(`CRM create activity failed: ${activityRes.status} - ${errBody}`)
            // Não completa o fluxo se falhar atividade, mas lead já foi criado
        }

        return { success: true, name: data.name }
    } catch (error) {
        console.error("Erro CRM:", error)
        // E-mail já foi enviado no início - retorna sucesso se enviou
        if (emailResult.success) {
            return { success: true, name: data.name }
        }
        return { success: false }
    }
}
