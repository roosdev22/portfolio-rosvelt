"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="accueil"
      className="relative h-screen w-full overflow-hidden"
    >
      <Image
        src="/Paintings/baner.jpg"
        alt="Œuvre de Jean Baptiste Rosvelt"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="w-16 h-[1px] bg-[#b5895a] mb-8" />

        <p className="text-[#b5895a] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-inter)]">
          Artiste Peintre International
        </p>

        <h1 className="font-[family-name:var(--font-playfair)] text-white text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Jean Baptiste
          <br />
          <span className="italic font-normal text-4xl md:text-6xl lg:text-7xl">
            Rosvelt
          </span>
        </h1>

        <p className="text-white/70 text-base md:text-lg max-w-md mb-10 font-[family-name:var(--font-inter)]">
          Peintures originales qui capturent l'âme et les émotions à travers la couleur
        </p>

        <div className="w-16 h-[1px] bg-[#b5895a] mb-10" />

        <div className="flex flex-col sm:flex-row gap-4">
          
           <a href="#galerie"
            className="px-8 py-3 bg-[#b5895a] text-white text-sm tracking-widest uppercase hover:bg-[#a07848] transition-colors duration-300"
          >
            Voir la Galerie
          </a>
          
            <a href="#contact"
            className="px-8 py-3 border border-white/50 text-white text-sm tracking-widest uppercase hover:border-[#b5895a] hover:text-[#b5895a] transition-colors duration-300"
          >
            Me Contacter
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <div className="w-[1px] h-12 bg-white/30 animate-pulse" />
      </div>

    </section>
  )
}