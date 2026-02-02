import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Car, Shield, Award, HeadphonesIcon, Search, Filter, ArrowRight } from "lucide-react"
import { getAutos } from "@/lib/api"
import Image from "next/image"

export default async function HomePage() {
  const autos = await getAutos()
  const autosDestacados = autos.filter((auto) => auto.estado === "Disponible").slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden"
          aria-label="Sección principal de bienvenida"
        >
          <div className="absolute inset-0 bg-grid-white/10" aria-hidden="true" />
          <div className="container relative px-4 py-24 mx-auto md:py-32">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl text-balance">
                Encuentra el Auto de tus Sueños
              </h1>
              <p className="text-lg text-primary-foreground/90 md:text-xl leading-relaxed text-pretty">
                Más de 100 vehículos de calidad premium esperándote. Financiamiento flexible y garantía extendida en
                todos nuestros autos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" variant="secondary" className="text-base">
                  <Link href="/catalogo">
                    <Search className="w-4 h-4 mr-2" aria-hidden="true" />
                    Ver Catálogo
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/contacto">Contáctanos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50" aria-labelledby="features-heading">
          <div className="container px-4 mx-auto">
            <h2 id="features-heading" className="sr-only">
              Nuestros servicios
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="p-3 rounded-lg bg-primary/10" aria-hidden="true">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Amplia Selección</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Más de 100 vehículos de las mejores marcas
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="p-3 rounded-lg bg-primary/10" aria-hidden="true">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Garantía Extendida</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Todos nuestros autos con garantía de calidad
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="p-3 rounded-lg bg-primary/10" aria-hidden="true">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Mejor Precio</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Financiamiento flexible y precios competitivos
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="p-3 rounded-lg bg-primary/10" aria-hidden="true">
                    <HeadphonesIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Atención 24/7</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Soporte personalizado en todo momento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="py-16 bg-white" aria-labelledby="mission-vision-heading">
          <div className="container px-4 mx-auto">
            <h2 id="mission-vision-heading" className="sr-only">
              Nuestra Misión y Visión
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block p-3 rounded-lg bg-primary/10">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Nuestra Misión</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transformar la experiencia de compra de vehículos, ofreciendo calidad, transparencia y un servicio
                  excepcional que supere las expectativas de cada cliente. Nos esforzamos por construir relaciones
                  duraderas basadas en la confianza y la honestidad.
                </p>
              </div>
              <div className="space-y-6">
                <div className="inline-block p-3 rounded-lg bg-primary/10">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Nuestra Visión</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ser el concesionario líder referente en el mercado, reconocidos por nuestra integridad, innovación y
                  compromiso con la satisfacción total de nuestros clientes. Aspiramos a establecer nuevos estándares de
                  excelencia en la industria automotriz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section className="py-16" aria-labelledby="featured-heading">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
              <div className="space-y-2">
                <h2 id="featured-heading" className="text-3xl font-bold tracking-tight text-balance">
                  Autos Destacados
                </h2>
                <p className="text-muted-foreground leading-relaxed">Descubre nuestra selección premium de vehículos</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/catalogo">
                  Ver Todos
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {autosDestacados.map((auto) => (
                <Card key={auto.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-muted">
                    <Image
                      src={auto.imagenUrl || "/placeholder.svg"}
                      alt={`${auto.marca} ${auto.modelo} ${auto.anio}`}
                      fill
                      className="object-cover"
                    />
                    {auto.estado === "Disponible" && (
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Disponible</Badge>
                    )}
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-balance">
                        {auto.marca} {auto.modelo}
                      </h3>
                      <p className="text-sm text-muted-foreground">{auto.anio}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{auto.combustible}</Badge>
                      <Badge variant="secondary">{auto.transmision}</Badge>
                      <Badge variant="secondary">{auto.kilometraje.toLocaleString()} km</Badge>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-primary">€{auto.precio.toLocaleString()}</p>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/catalogo/${auto.id}`}>Ver Detalles</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-balance">
                ¿Listo para tu próximo auto?
              </h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty">
                Visítanos hoy o agenda una cita para una prueba de manejo sin compromiso
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contacto">Agendar Cita</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/catalogo">
                    <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
                    Buscar Autos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
