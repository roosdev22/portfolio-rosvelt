"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setNewsletterStatus("loading")
    // Simuler l'envoi - À remplacer par votre API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setNewsletterStatus("success")
    setEmail("")
    setTimeout(() => setNewsletterStatus("idle"), 3000)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Navigation principale
  const mainNav = [
    { name: "Accueil", href: "#home", icon: "🏠" },
    { name: "Galerie", href: "#galerie", icon: "🖼️" },
    { name: "À propos", href: "#apropos", icon: "👤" },
    { name: "Contact", href: "#contact", icon: "✉️" },
  ]

  // Catégories d'œuvres
  const categories = [
    { name: "Paysages", href: "#galerie", count: 24 },
    { name: "Portraits", href: "#galerie", count: 18 },
    { name: "Scènes de vie", href: "#galerie", count: 15 },
    { name: "Commandes", href: "#contact", count: null },
  ]

  // Informations légales
  const legalLinks = [
    { name: "Mentions légales", href: "#" },
    { name: "Politique de confidentialité", href: "#" },
    { name: "CGV", href: "#" },
    { name: "Crédits", href: "#" },
  ]

  // Réseaux sociaux détaillés
  const socials = [
    {
    name: "Facebook",
    href: "https://facebook.com/votre_compte",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
    {
    name: "Instagram",
    href: "https://instagram.com/votre_compte",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#E4405F" stroke="none"/>
      </svg>
    ),
  },
    
    
   {
    name: "WhatsApp",
    href: "https://wa.me/50955076705",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.658 1.43 5.63 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  }, 
  ]

  return (
    <footer className="relative bg-[#1a1a1a] text-white/70">
      {/* Badge d'artiste - Décoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#b5895a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      {/* Section Newsletter Premium */}
      <div className="relative border-b border-white/10 bg-gradient-to-r from-[#1a1a1a] to-[#222222]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b5895a]/10 border border-[#b5895a]/20 mb-4">
                <span className="text-[#b5895a] text-xs">✨</span>
                <span className="text-[#b5895a] text-xs uppercase tracking-wider">Collection Privée</span>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white mb-3">
                Recevez l'inspiration
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Abonnez-vous à ma newsletter pour découvrir mes nouvelles œuvres en avant-première, 
                recevoir des invitations aux expositions et profiter d'offres exclusives.
              </p>
            </div>
            
            <form onSubmit={handleNewsletter} className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    className="w-full sm:w-80 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#b5895a] focus:ring-1 focus:ring-[#b5895a] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="px-6 py-3 bg-[#b5895a] text-white rounded-xl hover:bg-[#a07848] transition-all font-medium disabled:opacity-50 whitespace-nowrap"
                >
                  {newsletterStatus === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Abonnement...
                    </span>
                  ) : newsletterStatus === "success" ? (
                    <span className="flex items-center gap-2">✓ Abonné !</span>
                  ) : (
                    "S'abonner"
                  )}
                </button>
              </div>
              <p className="text-xs text-white/30 mt-3 text-center sm:text-left">
                Aucun spam. Désinscription facile à tout moment.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Colonne 1 - Brand & Bio - 4 colonnes */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-white tracking-tight">
                Atelier
                <span className="text-[#b5895a]"> d'Art</span>
              </h2>
              <div className="w-12 h-[2px] bg-[#b5895a] mt-3" />
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Artiste peintre basé en Haiti, je capture l'émotion et la lumière à travers des œuvres uniques, 
              mêlant techniques classiques et sensibilité contemporaine.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#1a1a1a] flex items-center justify-center text-xs text-white/50">
                    🎨
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/40">+120 œuvres créées</p>
            </div>
          </div>

          {/* Colonne 2 - Navigation - 2 colonnes */}
          <div className="lg:col-span-2">
            <h4 className="font-[family-name:var(--font-playfair)] text-white text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm text-white/50 hover:text-[#b5895a] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Catégories - 2 colonnes */}
          <div className="lg:col-span-2">
            <h4 className="font-[family-name:var(--font-playfair)] text-white text-sm uppercase tracking-wider mb-4">
              Collections
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => scrollToSection(cat.href)}
                    className="text-sm text-white/50 hover:text-[#b5895a] transition-colors duration-300 flex items-center justify-between group w-full"
                  >
                    <span>{cat.name}</span>
                    {cat.count && (
                      <span className="text-xs text-white/30 group-hover:text-[#b5895a]/50 transition-colors">
                        {cat.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Contact & Horaires - 4 colonnes */}
          <div className="lg:col-span-4">
            <h4 className="font-[family-name:var(--font-playfair)] text-white text-sm uppercase tracking-wider mb-4">
              Atelier & Contact
            </h4>
            
            <div className="space-y-4">
              {/* Adresse */}
              <div className="flex items-start gap-3">
                <span className="text-[#b5895a] text-lg">📍</span>
                <div>
                  <p className="text-sm text-white/70">Digouarant</p>
                  <p className="text-sm text-white/50">st michel, Haiti</p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start gap-3">
                <span className="text-[#b5895a] text-lg">🕒</span>
                <div>
                  <p className="text-sm text-white/70">Mardi - Samedi: 8h - 4h</p>
                  <p className="text-sm text-white/50">Sur rendez-vous uniquement</p>
                </div>
              </div>

              {/* Email avec copie */}
              <div className="flex items-center gap-3">
                <span className="text-[#b5895a] text-lg">📧</span>
                <button
                  onClick={() => copyToClipboard("artiste@votredomaine.com", "email")}
                  className="text-sm text-white/70 hover:text-[#b5895a] transition-colors relative group"
                >
                  jeanbaptisteroosvelt20@gmail.com
                  <span className="absolute -top-8 left-0 bg-[#b5895a] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {copiedField === "email" ? "Copié !" : "Cliquer pour copier"}
                  </span>
                </button>
              </div>

              {/* Téléphone */}
              <div className="flex items-center gap-3">
                <span className="text-[#b5895a] text-lg">📱</span>
                <button
                  onClick={() => copyToClipboard("+509 31 11 26 00", "phone")}
                  className="text-sm text-white/70 hover:text-[#b5895a] transition-colors relative group"
                >
                  +509 31 11 26 00
                  <span className="absolute -top-8 left-0 bg-[#b5895a] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {copiedField === "phone" ? "Copié !" : "Cliquer pour copier"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux avec stats */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/40 hover:text-[#b5895a] transition-all duration-300"
                >
                  <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#b5895a]/20 transition-all group-hover:scale-110">
                    {social.icon}
                  </span>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{social.name}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Badge de confiance */}
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <span className="text-[#b5895a]">✓</span> Paiement sécurisé
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#b5895a]">✓</span> Livraison internationale
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#b5895a]">✓</span> Certificat d'authenticité
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Liens légaux et copyright */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs text-white/30 hover:text-[#b5895a] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-xs text-white/30">
                © {currentYear} Atelier d'Art — Tous droits réservés
              </p>
              <p className="text-xs text-white/20 mt-1">
                Design & développement par l'artiste
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton "Retour en haut" avec animation */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#b5895a] text-white shadow-lg hover:bg-[#a07848] transition-all duration-300 flex items-center justify-center z-50 group"
      >
        <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  )
}