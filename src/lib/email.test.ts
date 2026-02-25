import { describe, it, expect, vi, beforeEach } from "vitest"

describe("sendLeadNotification", () => {
    const originalEnv = process.env
    const mockFetch = vi.fn()

    beforeEach(() => {
        mockFetch.mockReset()
        ;(globalThis as any).fetch = mockFetch
        process.env = { ...originalEnv }
    })

    it("retorna erro quando CONTACT_FORM_KEY não está configurado", async () => {
        delete process.env.CONTACT_FORM_KEY
        const { sendLeadNotification } = await import("./email")
        const result = await sendLeadNotification("test@example.com", {
            name: "João",
            email: "joao@test.com",
            message: "Olá!",
        })
        expect(result.success).toBe(false)
        expect(result.error).toContain("CONTACT_FORM_KEY")
        expect(mockFetch).not.toHaveBeenCalled()
    })

    it("envia e-mail quando CONTACT_FORM_KEY está configurado", async () => {
        process.env.CONTACT_FORM_KEY = "test_access_key"
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ success: true }),
            text: async () => "",
        })
        const { sendLeadNotification } = await import("./email")
        const result = await sendLeadNotification("destino@example.com", {
            name: "Maria",
            email: "maria@test.com",
            message: "Quero mais informações.",
        })
        expect(result.success).toBe(true)
        expect(mockFetch).toHaveBeenCalledWith(
            "https://api.web3forms.com/submit",
            expect.objectContaining({
                method: "POST",
            }),
        )
    })

    it("escapa caracteres HTML nos dados do lead", async () => {
        process.env.CONTACT_FORM_KEY = "test_access_key"
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ success: true }),
            text: async () => "",
        })
        const { sendLeadNotification } = await import("./email")
        await sendLeadNotification("a@b.com", {
            name: "<script>alert(1)</script>",
            email: "x@y.com",
            message: "Teste & <html>",
        })
        const call = mockFetch.mock.calls[0][1]
        const body = JSON.parse(call.body as string)
        expect(body.html).not.toContain("<script>")
        expect(body.html).toContain("&lt;script&gt;")
        expect(body.html).toContain("&amp;")
    })
})
