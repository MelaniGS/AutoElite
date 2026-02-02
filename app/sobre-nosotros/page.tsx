import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, TrendingUp } from "lucide-react"

export default function SobreNosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12" aria-labelledby="about-heading">
          <div className="container px-4 mx-auto text-center">
            <h1 id="about-heading" className="text-4xl font-bold tracking-tight text-balance">
              Sobre Nosotros
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
              Tu concesionaria de confianza desde 1995
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16" aria-labelledby="story-heading">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 id="story-heading" className="text-3xl font-bold tracking-tight mb-6 text-balance">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AutoPremier nació en 1995 con una visión clara: ofrecer vehículos de calidad con un servicio
                  excepcional. Durante más de 28 años, hemos ayudado a miles de familias a encontrar el auto perfecto
                  para sus necesidades.
                </p>
                <p>
                  Comenzamos como un pequeño concesionario familiar y hemos crecido hasta convertirnos en una de las
                  concesionarias más respetadas de la región, manteniendo siempre nuestros valores fundamentales de
                  honestidad, transparencia y compromiso con el cliente.
                </p>
                <p>
                  Hoy en día, ofrecemos una amplia selección de vehículos de las mejores marcas, con opciones de
                  financiamiento flexibles y garantías extendidas que te dan tranquilidad en tu inversión.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/50" aria-labelledby="values-heading">
          <div className="container px-4 mx-auto">
            <h2 id="values-heading" className="text-3xl font-bold tracking-tight text-center mb-12 text-balance">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="p-3 rounded-lg bg-primary/10" aria-hidden="true">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Confianza</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Transparencia y honestidad en cada transacción
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="p-3 rounded-lg bg-primary/10" aria-hidden="true">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Servicio al Cliente</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Atención personalizada y compromiso con tu satisfacción
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
                    <h3 className="font-semibold">Calidad</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Solo los mejores vehículos con garantías completas
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="p-3 rounded-lg bg-primary/10" aria-hidden="true">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Innovación</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Adaptándonos a las nuevas tecnologías y necesidades
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16" aria-label="Estadísticas de la empresa">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">28+</div>
                <div className="text-sm text-muted-foreground mt-2">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground mt-2">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground mt-2">Vehículos en stock</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground mt-2">Tasa de satisfacción</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
