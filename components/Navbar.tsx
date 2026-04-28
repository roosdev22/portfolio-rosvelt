"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Galerie", href: "#galerie" },
  { label: "À propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-[#faf8f5]/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          href="#accueil"
          className={`font-[family-name:var(--font-playfair)] text-xl tracking-wide transition-colors ${
            scrolled || isOpen ? "text-[#2c2c2c]" : "text-white"
          }`}
        >
          J.B. Rosvelt
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors hover:text-[#b5895a] ${
                  scrolled ? "text-[#2c2c2c]" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Burger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden text-sm tracking-widest uppercase ${
            scrolled || isOpen ? "text-[#2c2c2c]" : "text-white"
          }`}
        >
          {isOpen ? "Fermer" : "Menu"}
        </button>

      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-6 py-6 bg-[#faf8f5]/95 backdrop-blur-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm tracking-widest uppercase text-[#2c2c2c] hover:text-[#b5895a] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}