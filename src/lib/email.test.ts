import { describe, it, expect, vi, beforeEach } from "vitest"

const mockSend = vi.fn()

vi.mock("resend", () => ({
    Resend: vi.fn().mockImplementation(() => ({
        emails: { send: mockSend },
    })),
}))

describe("sendLeadNotification", () => {
    const originalEnv = process.env

    beforeEach(() => {
        mockSend.mockReset()
        mockSend.mockResolvedValue({ data: { id: "test-id" }, error: null })
        process.env = { ...originalEnv }
    })

    it("retorna erro quando RESEND_API_KEY não está configurado", async () => {
        delete process.env.RESEND_API_KEY
        const { sendLeadNotification } = await import("./email")
        const result = await sendLeadNotification("test@example.com", {
            name: "João",
            email: "joao@test.com",
            message: "Olá!",
        })
        expect(result.success).toBe(false)
        expect(result.error).toContain("RESEND_API_KEY")
        expect(mockSend).not.toHaveBeenCalled()
    })

    it("envia e-mail quando RESEND_API_KEY está configurado", async () => {
        process.env.RESEND_API_KEY = "re_test123"
        const { sendLeadNotification } = await import("./email")
        const result = await sendLeadNotification("destino@example.com", {
            name: "Maria",
            email: "maria@test.com",
            message: "Quero mais informações.",
        })
        expect(result.success).toBe(true)
        expect(mockSend).toHaveBeenCalledWith(
            expect.objectContaining({
                to: ["destino@example.com"],
                subject: "[Hajir] Novo lead: Maria",
            }),
        )
    })

    it("escapa caracteres HTML nos dados do lead", async () => {
        process.env.RESEND_API_KEY = "re_test123"
        const { sendLeadNotification } = await import("./email")
        await sendLeadNotification("a@b.com", {
            name: "<script>alert(1)</script>",
            email: "x@y.com",
            message: "Teste & <html>",
        })
        const call = mockSend.mock.calls[0][0]
        expect(call.html).not.toContain("<script>")
        expect(call.html).toContain("&lt;script&gt;")
        expect(call.html).toContain("&amp;")
    })
})
