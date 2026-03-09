"use client"

import { useEffect, useState } from "react"
import { UTM_STORAGE_KEY, type UtmParams } from "@/lib/gtm"

export type { UtmParams } from "@/lib/gtm"
export { UTM_STORAGE_KEY }

const UTMS_TO_CAPTURE = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

/**
 * Captura gclid e UTMs da URL (apenas no cliente, após hidratação) e persiste no localStorage.
 * Toda a leitura de URL e localStorage acontece dentro do useEffect para evitar hydration mismatch.
 * Retorna sempre um objeto estável no primeiro render (vazio) para não causar re-renders em loop.
 */
export function useUtms(): UtmParams {
  const [utms] = useState<UtmParams>(() => ({}))

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
      // localStorage indisponível (ex.: modo privado)
    }
  }, [])

  return utms
}
