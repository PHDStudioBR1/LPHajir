"use client"

import { useUtms } from "@/hooks/useUtms"

/**
 * Componente invisível que, no client, captura UTMs da URL (gclid, utm_source, utm_campaign, etc.)
 * e persiste no localStorage. Incluído no layout raiz para que o evento generate_lead receba esses dados.
 */
export function UtmTracker() {
  useUtms()
  return null
}
