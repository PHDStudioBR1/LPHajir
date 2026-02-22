import { describe, it, expect, vi, beforeEach } from "vitest"
import { submitContactForm } from "./actions"

vi.mock("./email", () => ({
    sendLeadNotification: vi.fn().mockResolvedValue({ success: true }),
}))

describe("submitContactForm", () => {
    const CRM_BASE = "https://phdcrm.546digitalservices.com"
    const formData = {
        name: "João Silva",
        email: "joao@exemplo.com",
        whatsapp: "11999998888 - Interesse em consulta",
        consent: true,
    }

    beforeEach(() => {
        vi.stubGlobal(
            "fetch",
            vi.fn((url: string, init?: RequestInit) => {
                const path = new URL(url).pathname
                if (path.includes("/auth/login")) {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({ access_token: "token-123" }),
                    } as Response)
                }
                if (path.includes("/leads")) {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({ data: { id: 42 } }),
                    } as Response)
                }
                if (path.includes("/activities")) {
                    return Promise.resolve({ ok: true } as Response)
                }
                return Promise.resolve({ ok: false, status: 404 })
            }),
        )
        process.env.CRM_BASE_URL = CRM_BASE
        process.env.NOTIFICATION_EMAIL = "notify@test.com"
        process.env.CRM_ADMIN_EMAIL = "admin@test"
        process.env.CRM_ADMIN_PASSWORD = "secret"
        process.env.CRM_TENANT_SLUG = "hajir"
        process.env.CRM_USER_ID = "1"
    })

    it("retorna sucesso quando o fluxo completo funciona", async () => {
        const result = await submitContactForm(formData)
        expect(result).toEqual({ success: true, name: "João Silva" })
    })

    it("chama login, cria lead, cria atividade e envia e-mail", async () => {
        const fetchMock = vi.mocked(fetch)
        await submitContactForm(formData)

        expect(fetchMock).toHaveBeenCalledWith(
            `${CRM_BASE}/auth/login`,
            expect.objectContaining({
                method: "POST",
                body: expect.stringContaining("admin@test"),
            }),
        )
        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining("/leads"),
            expect.objectContaining({
                method: "POST",
                body: expect.stringContaining("joao@exemplo.com"),
            }),
        )
        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining("/activities"),
            expect.objectContaining({
                method: "POST",
                body: expect.stringContaining("42"),
            }),
        )
    })

    it("retorna failure quando login falha", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn((url: string) => {
                if (String(url).includes("/auth/login")) {
                    return Promise.resolve({ ok: false, status: 401 })
                }
                return Promise.resolve({ ok: true, json: () => ({}) })
            }),
        )
        const result = await submitContactForm(formData)
        expect(result).toEqual({ success: false })
    })

    it("retorna failure quando criação de lead falha", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn((url: string) => {
                if (String(url).includes("/auth/login")) {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({ access_token: "tok" }),
                    } as Response)
                }
                if (String(url).includes("/leads")) {
                    return Promise.resolve({ ok: false, status: 422 })
                }
                return Promise.resolve({ ok: true })
            }),
        )
        const result = await submitContactForm(formData)
        expect(result).toEqual({ success: false })
    })
})
