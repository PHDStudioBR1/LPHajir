"use server"

import * as z from "zod"
import { contactFormSchema } from "./schemas"
import { sendLeadNotification } from "./email"

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
    try {
        const CRM_BASE = process.env.CRM_BASE_URL || "https://phdcrm.546digitalservices.com"
        const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL || "donavan.alencar@gmail.com"

        // 1) Login no CRM
        const loginRes = await fetch(`${CRM_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: process.env.CRM_ADMIN_EMAIL || "admin@hajir",
                password: process.env.CRM_ADMIN_PASSWORD || "admin123",
                tenant_slug: process.env.CRM_TENANT_SLUG || "hajir",
            }),
        })

        if (!loginRes.ok) {
            throw new Error(`CRM login failed: ${loginRes.status}`)
        }

        const loginData = (await loginRes.json()) as { access_token?: string }
        const access_token = loginData.access_token
        if (!access_token) {
            throw new Error("CRM login: no access_token in response")
        }

        // 2) Criar Lead
        const leadRes = await fetch(`${CRM_BASE}/api/crm/v1/leads`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({
                email: data.email,
                first_name: data.name,
                custom_values: {
                    observacao: data.whatsapp,
                },
            }),
        })

        if (!leadRes.ok) {
            const errBody = await leadRes.text()
            throw new Error(`CRM create lead failed: ${leadRes.status} - ${errBody}`)
        }

        const leadData = (await leadRes.json()) as { data?: { id?: number } }
        const LEAD_ID = leadData.data?.id
        if (LEAD_ID == null) {
            throw new Error("CRM create lead: no lead id in response")
        }

        // 3) Criar Atividade
        const activityRes = await fetch(`${CRM_BASE}/api/crm/v1/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
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

        // 4) Notificação por E-mail (Resend)
        const emailResult = await sendLeadNotification(TARGET_EMAIL, {
            name: data.name,
            email: data.email,
            message: data.whatsapp,
        })
        if (!emailResult.success) {
            console.warn("E-mail não enviado:", emailResult.error)
        }

        return { success: true, name: data.name }
    } catch (error) {
        console.error("Erro na integração:", error)
        return { success: false }
    }
}
