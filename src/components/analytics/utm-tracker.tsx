"use client"

import { useUtmTracking } from "@/hooks/useUtmTracking"

/**
 * Componente invisível que, no client, captura UTMs da URL e persiste no localStorage.
 * Incluído no layout raiz para que toda a aplicação tenha UTMs disponíveis
 * para o evento generate_lead e para o GTM.
 */
export function UtmTracker() {
  useUtmTracking()
  return null
}
