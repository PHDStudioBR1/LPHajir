/**
 * Formata o número para o padrão E.164 esperado pelo CRM: +5511999999999
 */
export function formatPhoneForApi(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.length >= 12 && digits.startsWith("55")) {
    return `+${digits}`
  }
  if (digits.length >= 10) {
    return `+55${digits}`
  }
  return phone
}

/**
 * Aplica máscara ao digitar: (11) 99999-9999
 */
export function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) {
    return digits ? `(${digits}` : ""
  }
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}
