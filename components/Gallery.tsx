"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import data from "@/data/paintings.json"

type Painting = {
  id: number
  title: string
  category: string
  year: number
  dimensions: string
  technique: string
  price: number
  available: boolean
  image: string
  description: string
}

const paintings: Painting[] = data.paintings

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [lightbox, setLightbox] = useState<Painting | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.location.hash === "#galerie" && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return
    if (lightbox) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [lightbox])

  const filtered =
    activeCategory === "Tous"
      ? paintings
      : paintings.filter((p) => p.category === activeCategory)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return
      const currentIndex = paintings.findIndex((p) => p.id === lightbox.id)
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setLightbox(paintings[currentIndex - 1])
      }
      if (e.key === "ArrowRight" && currentIndex < paintings.length - 1) {
        setLightbox(paintings[currentIndex + 1])
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightbox])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        type: "spring" as const,
        stiffness: 300,
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  }

  const lightboxVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  }

  const textChildrenVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  }

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  }

  const goldDotVariants = {
    initial: { scale: 1, opacity: 1 },
    pulse: {
      scale: [1, 1.3, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  }

  return (
    <motion.section
      id="galerie"
      ref={sectionRef}
      className="py-24 px-4 md:px-6 bg-[#faf8f5] scroll-mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.span
            className="text-[#b5895a] text-sm tracking-[0.3em] uppercase inline-block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Galerie
          </motion.span>
          <motion.h2
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#2c2c2c] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Mes Œuvres
          </motion.h2>
          <motion.div
            className="w-16 h-[1px] bg-[#b5895a] mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* FILTRES */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          variants={containerVariants}
        >
          {["Tous", ...Array.from(new Set(paintings.map((p) => p.category)))].map(
            (cat, idx) => (
              <motion.button
                key={cat}
                custom={idx}
                variants={filterVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm rounded-full transition-colors ${
                  activeCategory === cat
                    ? "bg-[#b5895a] text-white shadow-lg shadow-[#b5895a]/20"
                    : "bg-white text-[#b5895a] border border-[#b5895a]/30 hover:border-[#b5895a]"
                }`}
              >
                {cat}
              </motion.button>
            )
          )}
        </motion.div>

        {/* GALERIE */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filtered.map((painting, index) => (
            <motion.div
              key={painting.id}
              custom={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="break-inside-avoid group relative cursor-pointer rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-xl"
              onClick={() => setLightbox(painting)}
              onMouseEnter={() => setHoveredId(painting.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative w-full overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full"
                >
                  <Image
                    src={painting.image}
                    alt={painting.title}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </motion.div>

                <AnimatePresence>
                  {hoveredId === painting.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.div
                        className="absolute bottom-0 p-4 text-white"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <p className="font-[family-name:var(--font-cormorant)] italic text-lg">
                          {painting.title}
                        </p>
                        <p className="text-xs text-[#b5895a]">{painting.category}</p>
                        <p className="text-xs text-white/60">{painting.year}</p>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-sm text-[#b5895a] mt-2"
                        >
                          ${painting.price.toLocaleString()}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {painting.available && (
                  <motion.div
                    className="absolute top-3 right-3"
                    variants={goldDotVariants}
                    initial="initial"
                    animate="pulse"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#b5895a] shadow-[0_0_8px_#b5895a]" />
                  </motion.div>
                )}
                              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 bg-[#0d0c0b]/98 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                className="bg-[#0d0c0b] max-w-6xl w-full overflow-hidden border border-[#b5895a]/20"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col md:flex-row min-h-[600px]">
                  <motion.div
                    className="relative md:w-[55%] bg-[#0d0c0b] flex items-center justify-center p-8"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      className="relative w-full h-full min-h-[400px] md:min-h-[500px]"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={lightbox.image}
                        alt={lightbox.title}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, 55vw"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="md:w-[45%] bg-[#0d0c0b] flex items-center"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="w-full px-8 py-12 md:py-0">
                      <motion.h3
                        custom={0}
                        variants={textChildrenVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-[family-name:var(--font-cormorant)] italic text-3xl md:text-4xl text-[#b5895a] mb-3"
                      >
                        {lightbox.title}
                      </motion.h3>

                      <motion.p
                        custom={1}
                        variants={textChildrenVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-[family-name:var(--font-jost)] font-light text-sm text-white/60 uppercase tracking-wide mb-6"
                      >
                        {lightbox.category}
                      </motion.p>

                      <motion.p
                        custom={2}
                        variants={textChildrenVariants}
                        initial="hidden"
                        animate="visible"
                        className="font-[family-name:var(--font-jost)] font-light text-sm text-white/80 leading-relaxed mb-8 border-l-2 border-[#b5895a]/30 pl-4"
                      >
                        {lightbox.description}
                      </motion.p>

                      <motion.div
                        className="grid grid-cols-2 gap-5 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {[
                          { label: "Année", value: lightbox.year },
                          { label: "Technique", value: lightbox.technique },
                          { label: "Dimensions", value: lightbox.dimensions },
                          { label: "Prix", value: `$${lightbox.price.toLocaleString()}`, isPrice: true },
                        ].map((spec, idx) => (
                          <motion.div
                            key={spec.label}
                            custom={idx + 3}
                            variants={textChildrenVariants}
                          >
                            <div className="font-[family-name:var(--font-jost)] text-[10px] font-light text-[#b5895a] uppercase tracking-wider mb-1.5">
                              {spec.label}
                            </div>
                            <div className={`font-[family-name:var(--font-jost)] font-light ${spec.isPrice ? "text-lg text-[#b5895a]" : "text-sm text-white/70"}`}>
                              {spec.value}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <motion.div
                        custom={7}
                        variants={textChildrenVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {lightbox.available ? (
                          <motion.button
                            className="w-full border border-[#b5895a] text-[#b5895a] py-3 font-[family-name:var(--font-jost)] font-light text-sm uppercase tracking-wider"
                            whileHover={{
                              scale: 0.98,
                              backgroundColor: "#b5895a",
                              color: "#0d0c0b",
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.96 }}
                          >
                            Renseignements
                          </motion.button>
                        ) : (
                          <p className="text-center font-[family-name:var(--font-jost)] font-light text-white/40 text-sm uppercase tracking-wider">
                            Œuvre vendue
                          </p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  onClick={() => setLightbox(null)}
                  className="absolute top-6 right-6 text-white/60 text-2xl w-8 h-8 flex items-center justify-center rounded-full"
                  whileHover={{
                    color: "#b5895a",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    rotate: 90,
                    transition: { duration: 0.2 },
                  }}
                  aria-label="Fermer"
                >
                  ✕
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}