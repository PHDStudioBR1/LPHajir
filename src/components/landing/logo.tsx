"use client"

import Link from 'next/link'
import { useState } from 'react'

const LOGO_SRC =
  'https://raw.githubusercontent.com/PHDStudioBR1/Hajer/main/Logo%20Site.svg'

export function Logo() {
  const [error, setError] = useState(false)

  return (
    <Link href="/" className="flex items-center" aria-label="Dra. Hajir Abdalla - início">
      {error ? (
        <span className="text-xl md:text-2xl font-headline font-bold text-primary tracking-tight">
          Dra. Hajir Abdalla
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={LOGO_SRC}
          alt="Dra. Hajir Abdalla"
          className="h-10 md:h-12 w-auto"
          loading="eager"
          decoding="async"
          onError={() => setError(true)}
        />
      )}
    </Link>
  )
}
