import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@emailjs/browser", () => ({
  default: {
    init: vi.fn(),
    send: vi.fn(),
  },
}))

describe("sendLeadEmail (EmailJS)", () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    process.env = { ...originalEnv }
  })

  it("retorna erro quando NEXT_PUBLIC_EMAILJS_SERVICE_ID não está configurado", async () => {
    delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const { sendLeadEmail } = await import("./emailjs-client")
    const result = await sendLeadEmail({
      from_name: "João",
      from_email: "joao@test.com",
      phone: "11999999999",
      message: "Olá!",
    })
    expect(result.success).toBe(false)
    expect(result.error).toContain("NEXT_PUBLIC_EMAILJS")
  })

  it("retorna sucesso quando config está preenchida e emailjs.send resolve", async () => {
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = "service_test"
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = "template_test"
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = "key_test"
    const emailjs = await import("@emailjs/browser")
    vi.mocked(emailjs.default.send).mockResolvedValue(undefined as never)
    const { sendLeadEmail } = await import("./emailjs-client")
    const result = await sendLeadEmail({
      from_name: "Maria",
      from_email: "maria@test.com",
      phone: "11988887777",
      message: "Quero mais informações.",
    })
    expect(result.success).toBe(true)
    expect(emailjs.default.send).toHaveBeenCalledWith(
      "service_test",
      "template_test",
      expect.objectContaining({
        from_name: "Maria",
        from_email: "maria@test.com",
        phone: "11988887777",
        message: "Quero mais informações.",
        reply_to: "maria@test.com",
      }),
    )
  })
})
