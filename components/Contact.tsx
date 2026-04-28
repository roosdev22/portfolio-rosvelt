"use client"

import { useState, useEffect, useRef } from "react"
import emailjs from "@emailjs/browser"

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/votre_compte",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="#E4405F" stroke="none" />
      </svg>
    ),
  },

  {
    name: "WhatsApp",
    href: "https://wa.me/50955076705?text=Bonjour%20je%20souhaite%20vous%20contacter",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>
    ),
  },

  {
    name: "Facebook",
    href: "https://facebook.com/votre_compte",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },

  {
    name: "X",
    href: "https://x.com/votre_compte",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932Z" />
      </svg>
    ),
  },
]
export default function Contact() {
  const [form, setForm] = useState({
    from_name: "",
    lastName: "",
    from_email: "",
    subject: "Acquisition d'un tableau",
    message: "",
  })

  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [visible, setVisible] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { 
          setVisible(true)
          observer.disconnect() 
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.from_email || !form.message) { 
      setError("Veuillez remplir les champs obligatoires.")
      return 
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) { 
      setError("Configuration serveur incomplète.")
      return 
    }
    
    setLoading(true)
    setError("")

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
      setSent(true)
      setForm({ from_name: "", lastName: "", from_email: "", subject: "Acquisition d'un tableau", message: "" })
      setTimeout(() => setSent(false), 5000)
    } catch (err: any) {
      setError("Erreur lors de l'envoi du message.")
    } finally {
      setLoading(false)
    }
  }




  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-24 px-6 bg-[#f3efe9] transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-3xl mx-auto bg-white border border-[#e5d7c6] rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif text-[#2c2c2c] mb-3">Contact</h2>
          <p className="text-neutral-500 text-sm">
            Intéressé par une œuvre ou une collaboration ? Écris-moi.
          </p>
        </div>

        {/* ── Réseaux sociaux ── */}
        <div className="mb-8">
          <p className="text-xs text-neutral-400 text-center uppercase tracking-widest mb-4">
            Retrouvez-moi sur
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map(({ name, href, icon }) => (
              <a 
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e5d7c6] text-sm text-[#2c2c2c] hover:bg-[#f3efe9] transition-colors"
              >
                {icon}
                {name}
              </a>
            ))}
          </div>
        </div>

        <hr className="border-[#e5d7c6] mb-8" />

        {sent ? (
          <div className="text-center py-10">
            <p className="text-green-600 text-lg font-medium">Message envoyé avec succès !</p>
            <p className="text-sm text-neutral-400 mt-2">Je te réponds sous 24h.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="from_name" 
                type="text" 
                value={form.from_name} 
                onChange={handleChange} 
                placeholder="Prénom" 
                className="w-full p-3 border rounded-lg bg-[#faf8f5] focus:ring-1 focus:ring-[#b5895a] outline-none" 
              />
              <input 
                name="lastName" 
                type="text" 
                value={form.lastName} 
                onChange={handleChange} 
                placeholder="Nom" 
                className="w-full p-3 border rounded-lg bg-[#faf8f5] focus:ring-1 focus:ring-[#b5895a] outline-none" 
              />
            </div>
            <input 
              type="email" 
              name="from_email" 
              required 
              value={form.from_email} 
              onChange={handleChange} 
              placeholder="Email *" 
              className="w-full p-3 border rounded-lg bg-[#faf8f5] focus:ring-1 focus:ring-[#b5895a] outline-none" 
            />
            <select 
              name="subject" 
              value={form.subject} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg bg-[#faf8f5] focus:ring-1 focus:ring-[#b5895a] outline-none"
            >
              <option>Acquisition d'un tableau</option>
              <option>Commande personnalisée</option>
              <option>Collaboration artistique</option>
              <option>Autre demande</option>
            </select>
            <textarea 
              name="message" 
              required 
              rows={5} 
              value={form.message} 
              onChange={handleChange} 
              placeholder="Votre message..." 
              className="w-full p-3 border rounded-lg bg-[#faf8f5] focus:ring-1 focus:ring-[#b5895a] outline-none" 
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#b5895a] text-white py-4 rounded-lg hover:bg-[#9e7448] transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </button>
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          </form>
        )}
      </div>
    </section>
  )
}