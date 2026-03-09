"use client"

import Image from 'next/image'
import { useState } from 'react'

const HERO_IMAGE_SRC = '/images/dra-hajir-new.jpeg'

export function HeroImage() {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className="rounded-[12px] w-full max-w-[450px] h-[550px] object-cover shadow-2xl border-4 border-white bg-primary/10 flex items-center justify-center text-primary font-headline text-xl font-semibold text-center px-6"
        aria-label="Foto da Dra. Hajir Abdalla"
      >
        Dra. Hajir Abdalla
      </div>
    )
  }

  return (
    <Image
      src={HERO_IMAGE_SRC}
      alt="Dra. Hajir Abdalla - Psiquiatra"
      width={450}
      height={550}
      className="rounded-[12px] w-full max-w-[450px] object-cover shadow-2xl border-4 border-white"
      priority
      unoptimized
      onError={() => setError(true)}
    />
  )
}
