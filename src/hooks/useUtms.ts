"use client"

import { useEffect, useSyncExternalStore } from "react"
import { UTM_STORAGE_KEY, getUtmFromStorage, type UtmParams } from "@/lib/gtm"

export type { UtmParams } from "@/lib/gtm"
export { UTM_STORAGE_KEY }

/** Parâmetros de campanha capturados da URL (gclid, utm_source, utm_campaign, etc.). */
const UTMS_TO_CAPTURE = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

function getStoredUtmsSnapshot(): UtmParams {
  if (typeof window === "undefined") return {}
  return getUtmFromStorage()
}

function subscribeToStorage(cb: () => void) {
  const handler = () => cb()
  window.addEventListener("storage", handler)
  return () => window.removeEventListener("storage", handler)
}

/**
 * Captura gclid e parâmetros UTM da URL na primeira carga e persiste no localStorage.
 * Use no layout/página inicial para que os UTMs estejam disponíveis no evento generate_lead.
 */
export function useUtms(): UtmParams {
  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const stored: UtmParams = {}

    for (const key of UTMS_TO_CAPTURE) {
      const value = params.get(key)
      if (value) (stored as Record<string, string>)[key] = value
    }

    if (Object.keys(stored).length === 0) return

    try {
      window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // localStorage indisponível (modo privado, etc.)
    }
  }, [])

  return useSyncExternalStore(subscribeToStorage, getStoredUtmsSnapshot, getStoredUtmsSnapshot)
}

/**
 * Retorna os UTMs atualmente persistidos (para uso em eventos GTM, ex: generate_lead).
 * O evento pushGenerateLead em lib/gtm já injeta esses valores automaticamente.
 */
export function getStoredUtms(): UtmParams {
  return getUtmFromStorage()
}
