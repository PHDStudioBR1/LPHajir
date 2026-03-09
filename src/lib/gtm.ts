"use client"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/** Chave usada no localStorage para persistir parâmetros UTM e gclid. */
export const UTM_STORAGE_KEY = "utm_params"

export type UtmParams = {
  gclid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

/**
 * Lê os parâmetros UTM/gclid salvos no localStorage (preenchidos pelo useUtmTracking).
 */
export function getUtmFromStorage(): UtmParams {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as UtmParams
    return parsed
  } catch {
    return {}
  }
}

/**
 * Dispara o evento 'generate_lead' no dataLayer.
 * Deve ser chamado APENAS no bloco de sucesso da submissão do formulário
 * (após envio confirmado), nunca em clique de botão ou abertura de modal.
 */
export function pushGenerateLead(): void {
  if (typeof window === "undefined") return
  if (!window.dataLayer) {
    window.dataLayer = []
  }
  window.dataLayer.push({ event: "generate_lead" })
}
