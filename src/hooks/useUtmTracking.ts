"use client"

import { useEffect } from "react"
import { UTM_STORAGE_KEY, type UtmParams } from "@/lib/gtm"

export type { UtmParams } from "@/lib/gtm"
export { UTM_STORAGE_KEY }

/**
 * Lê os parâmetros de campanha da URL (query string) e persiste no localStorage.
 * Deve rodar no client (useEffect). Útil para manter UTMs após navegação SPA
 * e para enviar no evento generate_lead no GTM.
 */
export function useUtmTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const gclid = params.get("gclid")
    const utm_source = params.get("utm_source")
    const utm_medium = params.get("utm_medium")
    const utm_campaign = params.get("utm_campaign")
    const utm_term = params.get("utm_term")
    const utm_content = params.get("utm_content")

    const hasAny = gclid ?? utm_source ?? utm_medium ?? utm_campaign ?? utm_term ?? utm_content
    if (!hasAny) return

    const stored: UtmParams = {}
    if (gclid) stored.gclid = gclid
    if (utm_source) stored.utm_source = utm_source
    if (utm_medium) stored.utm_medium = utm_medium
    if (utm_campaign) stored.utm_campaign = utm_campaign
    if (utm_term) stored.utm_term = utm_term
    if (utm_content) stored.utm_content = utm_content

    try {
      window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // localStorage indisponível (privado, etc.)
    }
  }, [])
}
