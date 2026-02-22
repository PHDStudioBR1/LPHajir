#!/usr/bin/env npx tsx
/**
 * Script para testar as APIs do CRM PHD manualmente.
 * Uso: npx tsx scripts/test-crm-api.ts
 *
 * Configure as variáveis em .env.local ou exporte antes de rodar:
 *   CRM_BASE_URL, CRM_ADMIN_EMAIL, CRM_ADMIN_PASSWORD, CRM_TENANT_SLUG, CRM_USER_ID
 */

import dotenv from "dotenv"
// Carrega .env e depois .env.local (sobrescreve)
dotenv.config()
dotenv.config({ path: ".env.local", override: true })

const CRM_BASE = process.env.CRM_BASE_URL || "https://phdcrm.546digitalservices.com"
const CRM_EMAIL = process.env.CRM_ADMIN_EMAIL || "admin@hajir"
const CRM_PASS = process.env.CRM_ADMIN_PASSWORD || "admin123"
const TENANT = process.env.CRM_TENANT_SLUG || "hajir"
const USER_ID = parseInt(process.env.CRM_USER_ID || "1", 10)

async function testLogin(): Promise<string> {
    console.log("\n--- 1. Teste de Login ---")
    const res = await fetch(`${CRM_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: CRM_EMAIL,
            password: CRM_PASS,
            tenant_slug: TENANT,
        }),
    })
    const body = await res.json()
    if (!res.ok) {
        console.error("❌ Login falhou:", res.status, JSON.stringify(body, null, 2))
        throw new Error("Login falhou")
    }
    const token = body.access_token
    if (!token) {
        console.error("❌ Resposta sem access_token:", body)
        throw new Error("Sem access_token")
    }
    console.log("✅ Login ok, token recebido")
    return token
}

async function testCreateLead(token: string): Promise<number> {
    console.log("\n--- 2. Teste Criar Lead ---")
    const res = await fetch(`${CRM_BASE}/api/crm/v1/leads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            email: "teste-api@exemplo.com",
            first_name: "Teste API Script",
            phone: "+5511999999999",
            custom_values: { observacao: "Lead criado pelo script de teste" },
        }),
    })
    const body = await res.json()
    if (!res.ok) {
        console.error("❌ Criar lead falhou:", res.status, JSON.stringify(body, null, 2))
        throw new Error("Criar lead falhou")
    }
    const id = body.data?.id
    if (id == null) {
        console.error("❌ Resposta sem data.id:", body)
        throw new Error("Sem lead id")
    }
    console.log("✅ Lead criado, id:", id)
    return id
}

async function testCreateActivity(token: string, leadId: number): Promise<void> {
    console.log("\n--- 3. Teste Criar Atividade ---")
    const dueDate = new Date(Date.now() + 86400000).toISOString()
    const res = await fetch(`${CRM_BASE}/api/crm/v1/activities`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            lead_id: leadId,
            user_id: USER_ID,
            type: "call",
            title: "Atividade de teste - script",
            description: "Criada pelo script test-crm-api.ts",
            due_date: dueDate,
        }),
    })
    const body = await res.json()
    if (!res.ok) {
        console.error("❌ Criar atividade falhou:", res.status, JSON.stringify(body, null, 2))
        throw new Error("Criar atividade falhou")
    }
    console.log("✅ Atividade criada")
}

async function main() {
    console.log("=== Teste das APIs do CRM PHD ===")
    console.log("Base URL:", CRM_BASE)
    console.log("Tenant:", TENANT)

    const token = await testLogin()
    const leadId = await testCreateLead(token)
    await testCreateActivity(token, leadId)

    console.log("\n✅ Todos os testes passaram!")
}

main().catch((err) => {
    console.error("\n❌ Erro:", err.message)
    process.exit(1)
})
