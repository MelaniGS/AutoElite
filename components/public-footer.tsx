"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { getFooterData } from "@/lib/api"

export function PublicFooter() {
  const [footerData, setFooterData] = useState<any[]>([])

  useEffect(() => {
    getFooterData().then(setFooterData).catch(() => setFooterData([]))
  }, [])

  const getValue = (key: string, defaultVal: string) =>
    footerData.find((d: any) => d.keyName === key)?.value || defaultVal

  const address = getValue("address", "Calle Principal 123, Madrid, España")
  const phone = getValue("phone", "+34 900 123 456")
  const email = getValue("email", "info@autopremier.com")
  const facebook = getValue("facebook", "https://facebook.com")
  const instagram = getValue("instagram", "https://instagram.com")
  const twitter = getValue("twitter", "https://twitter.com")

  return (
    <footer className="border-t bg-muted/50" role="contentinfo">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Car className="w-6 h-6 text-primary" aria-hidden="true" />
              <span className="text-lg font-bold text-primary">AutoPremier</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu concesionaria de confianza. Vehículos de calidad con el mejor servicio y atención personalizada.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-2" aria-label="Enlaces rápidos del footer">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              >
                Catálogo
              </Link>
              <Link
                href="/panel"
                className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              >
                Mi Cuenta
              </Link>
              <Link
                href="/contacto"
                className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contacto</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${phone}`}
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  aria-label={`Llamar al ${phone}`}
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  aria-label={`Enviar correo a ${email}`}
                >
                  {email}
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Síguenos</h3>
            <div className="flex gap-3">
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Síguenos en Twitter"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AutoPremier. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
