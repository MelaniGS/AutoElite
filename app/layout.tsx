import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { SkipToMainContent } from "@/components/accessibility-skip-link"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoPremier - Tu Concesionaria de Confianza",
  description:
    "Encuentra el auto de tus sueños en AutoPremier. Más de 100 vehículos de calidad premium con financiamiento flexible y garantía extendida.",
  generator: "v0.app",
  keywords: ["concesionaria", "autos", "vehículos", "compra de autos", "autos usados", "autos nuevos"],
  authors: [{ name: "AutoPremier" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <SkipToMainContent />
        <div id="main-content">{children}</div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
