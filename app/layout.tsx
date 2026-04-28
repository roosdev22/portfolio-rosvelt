import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "JEAN BAPTISTE Rosvelt",
  description: "Artiste peintre international",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${inter.variable} bg-[#faf8f5] text-neutral-800 font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}