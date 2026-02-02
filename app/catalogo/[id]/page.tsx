import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Fuel, Gauge, Palette, Settings, CheckCircle2 } from "lucide-react"
import { getAutoById } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function AutoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const auto = await getAutoById(Number(resolvedParams.id))

  if (!auto) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1 py-12">
        <div className="container px-4 mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/catalogo">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Volver al Catálogo
            </Link>
          </Button>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                <Image
                  src={auto.imagenUrl || "/placeholder.svg"}
                  alt={`${auto.marca} ${auto.modelo} ${auto.anio}`}
                  fill
                  className="object-cover"
                  priority
                />
                {auto.estado === "Disponible" ? (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-base px-4 py-2">
                    Disponible
                  </Badge>
                ) : (
                  <Badge className="absolute top-4 right-4 text-base px-4 py-2" variant="secondary">
                    {auto.estado}
                  </Badge>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight text-balance">
                  {auto.marca} {auto.modelo}
                </h1>
                <p className="text-xl text-muted-foreground">{auto.anio}</p>
                <p className="text-4xl font-bold text-primary">€{auto.precio.toLocaleString()}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">{auto.descripcion}</p>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Especificaciones</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Año</p>
                        <p className="font-medium">{auto.anio}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gauge className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Kilometraje</p>
                        <p className="font-medium">{auto.kilometraje.toLocaleString()} km</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fuel className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Combustible</p>
                        <p className="font-medium">{auto.combustible}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Transmisión</p>
                        <p className="font-medium">{auto.transmision}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Palette className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-medium">{auto.color}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {auto.caracteristicas && auto.caracteristicas.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Características</h2>
                    <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {auto.caracteristicas.map((caracteristica, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                          <span>{caracteristica}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1" disabled={auto.estado !== "Disponible"}>
                  <Link href={`/contacto?auto=${auto.id}`}>
                    {auto.estado === "Disponible" ? "Solicitar Información" : "No Disponible"}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1 bg-transparent">
                  <Link href="/contacto">Agendar Prueba de Manejo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div >
  )
}
