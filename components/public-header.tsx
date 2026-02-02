"use client"

import Link from "next/link"
import { Car, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-between h-16 px-4 mx-auto" aria-label="Navegación principal">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
          aria-label="AutoPremier - Ir al inicio"
        >
          <Car className="w-6 h-6 text-primary" aria-hidden="true" />
          <span className="text-primary">AutoPremier</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
          >
            Catálogo
          </Link>
          <Link
            href="/sobre-nosotros"
            className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
          >
            Contacto
          </Link>
          <Button asChild size="sm">
            <Link href="/admin">Panel Admin</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background" role="menu">
          <div className="container px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className="block text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Catálogo
            </Link>
            <Link
              href="/sobre-nosotros"
              className="block text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contacto"
              className="block text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
            >
              Contacto
            </Link>
            <Button asChild size="sm" className="w-full">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                Panel Admin
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
