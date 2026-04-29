"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  ArrowUp, 
  Copy, 
  Check,
  Palette,
  Brain,
  Sparkles,
  Award,
  Clock,
  TrendingUp,
  Phone,
  Map,
  BookOpen,
  Flag,
  Heart,
  Eye,
  Star,
  Quote
} from "lucide-react"

import artistData from "@/data/paintings.json"

export default function About() {
  const [isVisible, setIsVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("bio")
  const [copied, setCopied] = useState(false)
  const [showFullStory, setShowFullStory] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const artist = artistData.artist
  const paintings = artistData.paintings || []

  const featuredPaintings = artistData.oeuvre_historique ?? []

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  }

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
  }

  const variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="apropos"
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-[#faf8f5] to-white overflow-hidden"
    >
      {/* BACKGROUND LUXE */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#b5895a] blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#d4a373] blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e8d5c4] blur-3xl rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">

       {/* HEADER */}
<motion.div
  initial="hidden"
  animate={isVisible ? "show" : "hidden"}
  variants={fadeUp}
  className="text-center mb-20"
>
  <p className="text-[#b5895a] tracking-[0.3em] text-sm uppercase font-light">
    L'Artiste Surréaliste Haïtien
  </p>
  <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#2c2c2c] mt-4">
    {artist.name}
  </h1>
  <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#b5895a] to-transparent mx-auto mt-6" />
  <p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
    {artist.birthDate} • {artist.birthPlace}
  </p>
</motion.div>

{/* SECTION PRINCIPALE */}
<div className="grid lg:grid-cols-3 gap-12">

  {/* PORTRAIT & INFO */}
  <motion.div
    initial="hidden"
    animate={isVisible ? "show" : "hidden"}
    variants={fadeUp}
    className="lg:col-span-1"
  >
    <div className="sticky top-28">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl shadow-2xl"
      >
        <div className="relative aspect-[3/4]  p-4">
          <div className="relative w-full h-full">
            <Image
              src="/Paintings/image16.jpg"
              alt={artist.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain" // Changé de object-cover à object-contain
              priority // Ajouté pour un chargement prioritaire
            />
          </div>
        </div>
        {/* Overlay plus subtil pour ne pas cacher l'image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      <div className="mt-6 space-y-3 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#b5895a]" />
          <span>Né le {artist.birthDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#b5895a]" />
          <span>{artist.birthPlace}</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-[#b5895a]" />
          <span>{artist.origin}</span>
        </div>
      </div>
    </div>
  </motion.div>

  {/* BIOGRAPHIE */}
  <motion.div
    initial="hidden"
    animate={isVisible ? "show" : "hidden"}
    variants={stagger}
    className="lg:col-span-2 space-y-8"
  >
    <motion.p variants={fadeUp} className="text-xl leading-relaxed text-neutral-700 font-light">
      {artist.biography.presentation}
    </motion.p>

    {/* Style artistique */}
    <motion.div variants={fadeUp} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[#b5895a]/10">
      <h3 className="text-2xl font-serif mb-3 flex items-center gap-2">
        <Palette size={24} className="text-[#b5895a]" />
        Style artistique
      </h3>
      <p className="text-neutral-600 mb-4">{artist.biography.style.summary}</p>
      <p className="text-neutral-500 text-sm">{artist.biography.style.techniques}</p>
      
      <div className="mt-4 pt-4 border-t border-[#b5895a]/10">
        <p className="font-semibold mb-2">Influences :</p>
        <p className="text-neutral-600">{artist.biography.style.influences}</p>
      </div>
    </motion.div>

    {/* Thèmes */}
    <motion.div variants={fadeUp}>
      <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
        <Brain size={20} className="text-[#b5895a]" />
        Thèmes explorés
      </h3>
      <div className="flex flex-wrap gap-2">
        {artist.biography.style.themes.map((theme, i) => (
          <span
            key={i}
            className="px-4 py-2 text-sm bg-white border border-[#b5895a]/20 rounded-full hover:bg-[#b5895a] hover:text-white transition-all duration-300 cursor-default"
          >
            {theme}
          </span>
        ))}
      </div>
    </motion.div>

    {/* Collectionneurs */}
    <motion.div variants={fadeUp} className="bg-gradient-to-r from-[#b5895a]/5 to-transparent p-6 rounded-2xl">
      <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
        <Award size={20} className="text-[#b5895a]" />
        Collectionneurs notables
      </h3>
      <div className="space-y-3">
        {artist.biography.collectors.notableCollectors.map((collector, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#b5895a] rounded-full" />
            <span className="text-neutral-700">{collector}</span>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
</div>{/* ÉVÉNEMENTS CLÉS - TIMELINE */}
<motion.div
  initial="hidden"
  animate={isVisible ? "show" : "hidden"}
  variants={stagger}
  className="mt-16"
>
  <h2 className="text-center text-3xl font-serif mb-8">
    Parcours artistique
  </h2>

  <div className="relative">
    {/* Ligne centrale */}
    <div className="absolute left-1/2 top-0 h-full w-px bg-[#b5895a]/20 hidden md:block -translate-x-1/2" />

    <div className="flex flex-col">
      {artist.biography.keyEvents.map((event, idx) => (
        <motion.div
          key={idx}
          variants={fadeUp}
          className={`relative flex mb-0 ${
            idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
          }`}
        >
          {/* Point central avec animation */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: idx * 0.1 
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#b5895a]/30 animate-ping" />
              <div className="relative w-4 h-4 rounded-full bg-[#b5895a] border-4 border-white shadow-lg" />
            </div>
          </motion.div>

          {/* Carte */}
          <div
            className={`w-full md:w-[calc(50%-2rem)] ${
              idx % 2 === 0 ? "md:pr-8" : "md:pl-8"
            }`}
          >
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#b5895a]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-[#b5895a]" />
                </div>

                <div>
                  <span className="text-xl font-bold text-[#b5895a]">
                    {event.year}
                  </span>

                  {event.month && (
                    <span className="text-neutral-500 text-sm ml-2">
                      {event.month}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-neutral-700 text-sm leading-relaxed ml-13">
                {event.event}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>
{artist.exhibitionCredits && (
  <motion.div
    initial="hidden"
    animate={isVisible ? "show" : "hidden"}
    variants={fadeUp}
    className="mt-24 grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl"
  >
    {/* CARD 1 */}
    <div className="group relative min-h-[500px] overflow-hidden">
      <img
        src="/Paintings/image13.jpg"
        alt={artist.exhibitionCredits.exhibitionName}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 transition-all duration-500" />

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
        {/* Toujours visible */}
        <div className="transform transition-all duration-500 group-hover:-translate-y-28">
          <p className="text-sm uppercase tracking-[0.25em] text-[#b5895a] mb-3">
            Exposition • 1986
          </p>

          <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
            {artist.exhibitionCredits.exhibitionName}
          </h3>

          <p className="text-white/70">
            {artist.exhibitionCredits.venue}
          </p>
        </div>

        {/* Détails hover */}
        <div className="absolute bottom-12 left-8 right-8 md:left-12 md:right-12
          opacity-0 translate-y-10
          group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-500 delay-100"
        >
          <p className="text-sm text-white/60 mb-4">
            {artist.exhibitionCredits.exhibitionDates}
          </p>

          <p className="text-white/75 italic text-sm leading-relaxed border-l-2 border-[#b5895a]/50 pl-4">
            {artist.exhibitionCredits.specialThanks}
          </p>
        </div>
      </div>
    </div>


    {/* CARD 2 */}
    <div className="group relative min-h-[500px] overflow-hidden">
      <img
        src="/Paintings/image12.jpg"
        alt="Exposition Coverage"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 transition-all duration-500" />

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
        <div className="transform transition-all duration-500 group-hover:-translate-y-24">
          <p className="text-sm uppercase tracking-[0.25em] text-[#b5895a] mb-3">
            Collection
          </p>

          <p className="text-4xl md:text-5xl font-bold text-white">
            {artist.exhibitionCredits.numberOfPaintings}
          </p>

          <p className="text-white/70 mt-2">
            œuvres exposées
          </p>
        </div>

        <div className="absolute bottom-12 left-8 right-8 md:left-12 md:right-12
          opacity-0 translate-y-10
          group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-500 delay-100"
        >
          <div className="w-12 h-px bg-[#b5895a]/50 mb-4" />

          <p className="text-white/80 leading-relaxed">
            {artist.exhibitionCredits.cover}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
)}

    {featuredPaintings.length > 0 && (
  <motion.div
    initial="hidden"
    animate={isVisible ? "show" : "hidden"}
    variants={stagger}
    className="mt-24"
  >
    <h2 className="text-center text-3xl font-serif mb-12">
      Œuvres emblématiques
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {featuredPaintings.map((painting) => (
        <motion.div
          key={painting.id}
          variants={fadeUp}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={painting.image}
              alt={painting.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-serif">{painting.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                painting.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {painting.available ? "Disponible" : "Vendu"}
              </span>
            </div>
            <p className="text-sm text-neutral-500 mb-2">
              {painting.year} • {painting.technique}
            </p>
            <p className="text-neutral-600 text-sm mb-3">{painting.dimensions}</p>
            <p className="text-lg font-bold text-[#b5895a]">{painting.price} $</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}
        {/* HISTOIRE DES RETROUVAILLES */}
        {artist.reunionStory && (
          <motion.div
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            variants={fadeUp}
            className="mt-24 bg-white rounded-3xl shadow-xl overflow-hidden border border-[#b5895a]/10"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Quote size={32} className="text-[#b5895a]" />
                <h2 className="text-2xl font-serif">{artist.reunionStory.title}</h2>
              </div>
              <p className="text-neutral-600 italic mb-4">Par {artist.reunionStory.narrator}</p>
              <div className="prose max-w-none">
                <p className="text-neutral-700 leading-relaxed">
                  {showFullStory 
                    ? artist.reunionStory.fullStory 
                    : `${artist.reunionStory.fullStory.substring(0, 600)}...`
                  }
                </p>
              </div>
              <button
                onClick={() => setShowFullStory(!showFullStory)}
                className="mt-4 text-[#b5895a] hover:text-[#8b6b42] font-semibold transition"
              >
                {showFullStory ? "Voir moins" : "Lire la suite →"}
              </button>

              {/* Prophétie */}
              <div className="mt-8 p-6 bg-[#b5895a]/5 rounded-xl border-l-4 border-[#b5895a]">
                <Sparkles size={18} className="text-[#b5895a] mb-2" />
                <p className="text-neutral-600 italic">"{artist.reunionStory.prophecy}"</p>
              </div>

              <p className="mt-6 text-neutral-700">{artist.reunionStory.reconnection}</p>
            </div>
          </motion.div>
        )}

        {/* CRÉDITS & CONTACT */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={fadeUp}
          className="mt-24 grid md:grid-cols-2 gap-8"
        >
          {/* Crédits */}
          <div className="bg-[#f5f2ef] p-8 rounded-2xl">
            <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-[#b5895a]" />
              Crédits
            </h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <p><span className="font-semibold">Article :</span> {artist.credits.article}</p>
              <p><span className="font-semibold">Introduction :</span> {artist.credits.introduction}</p>
              <p><span className="font-semibold">Éditeur :</span> {artist.credits.publisher}</p>
              <p className="text-xs text-neutral-400 mt-4">{artist.credits.copyright}</p>
              <p className="text-xs text-neutral-500 mt-2">{artist.credits.authenticityCertificates}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#f5f2ef] p-8 rounded-2xl">
            <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
              <Mail size={20} className="text-[#b5895a]" />
              Contact
            </h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <div className="flex items-start gap-2">
                <Map size={16} className="text-[#b5895a] mt-0.5" />
                <span>{artist.credits.contact.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-[#b5895a] mt-0.5" />
                <div>
                  {artist.credits.contact.phones.map((phone, i) => (
                    <p key={i}>{phone}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#b5895a]" />
                <button
                  onClick={() => copyEmail(artist.credits.contact.email)}
                  className="flex items-center gap-2 hover:text-[#b5895a] transition"
                >
                  {artist.credits.contact.email}
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOUTON RETOUR HAUT */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={fadeUp}
          className="flex justify-center mt-16"
        >
          <button
            onClick={scrollToTop}
            className="group px-8 py-3 border-2 border-[#b5895a] text-[#b5895a] rounded-full hover:bg-[#b5895a] hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
            Retour en haut
          </button>
        </motion.div>
      </div>
    </section>
  )
}