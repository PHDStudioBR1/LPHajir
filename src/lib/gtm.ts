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
 * Lê os parâmetros UTM/gclid salvos no localStorage (preenchidos pelo hook useUtms no UtmTracker).
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
 * Dispara o evento 'generate_lead' no dataLayer com UTMs do localStorage.
 * Deve ser chamado APENAS no bloco de sucesso da submissão do formulário
 * (após envio confirmado), nunca em clique de botão ou abertura de modal.
 */
export function pushGenerateLead(): void {
  if (typeof window === "undefined") return
  if (!window.dataLayer) {
    window.dataLayer = []
  }

  const utm = getUtmFromStorage()
  const payload: Record<string, unknown> = {
    event: "generate_lead",
  }

  if (utm.gclid) payload.gclid = utm.gclid
  if (utm.utm_source) payload.utm_source = utm.utm_source
  if (utm.utm_medium) payload.utm_medium = utm.utm_medium
  if (utm.utm_campaign) payload.utm_campaign = utm.utm_campaign
  if (utm.utm_term) payload.utm_term = utm.utm_term
  if (utm.utm_content) payload.utm_content = utm.utm_content

  window.dataLayer.push(payload)
}
