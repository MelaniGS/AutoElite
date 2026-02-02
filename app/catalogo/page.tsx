"use client"

import { useState, useEffect } from "react"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import Image from "next/image"
import { Search, SlidersHorizontal } from "lucide-react"
import type { Auto } from "@/lib/types"
import { getAutos } from "@/lib/api"

export default function CatalogoPage() {
  const [autos, setAutos] = useState<Auto[]>([])
  const [filteredAutos, setFilteredAutos] = useState<Auto[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [marcaFilter, setMarcaFilter] = useState("all")
  const [combustibleFilter, setCombustibleFilter] = useState("all")
  const [transmisionFilter, setTransmisionFilter] = useState("all")
  const [disponibleFilter, setDisponibleFilter] = useState("all")

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const data = await getAutos()
        setAutos(data)
        setFilteredAutos(data)
      } catch (error) {
        console.error("Error al cargar autos:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAutos()
  }, [])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...autos]

    // Filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (auto) =>
          auto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
          auto.modelo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro de marca
    if (marcaFilter !== "all") {
      filtered = filtered.filter((auto) => auto.marca === marcaFilter)
    }

    // Filtro de combustible
    if (combustibleFilter !== "all") {
      filtered = filtered.filter((auto) => auto.combustible === combustibleFilter)
    }

    // Filtro de transmisión
    if (transmisionFilter !== "all") {
      filtered = filtered.filter((auto) => auto.transmision === transmisionFilter)
    }

    // Filtro de disponibilidad
    if (disponibleFilter !== "all") {
      filtered = filtered.filter((auto) =>
        disponibleFilter === "true" ? auto.estado === "Disponible" : auto.estado !== "Disponible",
      )
    }

    setFilteredAutos(filtered)
  }, [searchTerm, marcaFilter, combustibleFilter, transmisionFilter, disponibleFilter, autos])

  const marcas = Array.from(new Set(autos.map((auto) => auto.marca)))

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12" aria-labelledby="catalog-heading">
          <div className="container px-4 mx-auto text-center">
            <h1 id="catalog-heading" className="text-4xl font-bold tracking-tight text-balance">
              Catálogo de Vehículos
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
              Explora nuestra amplia selección de autos
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-muted/50 border-b" aria-label="Filtros de búsqueda">
          <div className="container px-4 mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold">Filtros</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              {/* Búsqueda */}
              <div className="lg:col-span-2">
                <Label htmlFor="search" className="sr-only">
                  Buscar por marca o modelo
                </Label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="search"
                    type="search"
                    placeholder="Buscar marca o modelo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    aria-label="Buscar vehículos por marca o modelo"
                  />
                </div>
              </div>

              {/* Marca */}
              <div>
                <Label htmlFor="marca-filter" className="sr-only">
                  Filtrar por marca
                </Label>
                <Select value={marcaFilter} onValueChange={setMarcaFilter}>
                  <SelectTrigger id="marca-filter" aria-label="Seleccionar marca">
                    <SelectValue placeholder="Marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las marcas</SelectItem>
                    {marcas.map((marca) => (
                      <SelectItem key={marca} value={marca}>
                        {marca}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Combustible */}
              <div>
                <Label htmlFor="combustible-filter" className="sr-only">
                  Filtrar por tipo de combustible
                </Label>
                <Select value={combustibleFilter} onValueChange={setCombustibleFilter}>
                  <SelectTrigger id="combustible-filter" aria-label="Seleccionar combustible">
                    <SelectValue placeholder="Combustible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Disponibilidad */}
              <div>
                <Label htmlFor="disponible-filter" className="sr-only">
                  Filtrar por disponibilidad
                </Label>
                <Select value={disponibleFilter} onValueChange={setDisponibleFilter}>
                  <SelectTrigger id="disponible-filter" aria-label="Seleccionar disponibilidad">
                    <SelectValue placeholder="Disponibilidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="true">Disponibles</SelectItem>
                    <SelectItem value="false">No disponibles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12" aria-label="Resultados de búsqueda">
          <div className="container px-4 mx-auto">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                Mostrando {filteredAutos.length} de {autos.length} vehículos
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredAutos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No se encontraron vehículos con los filtros seleccionados
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAutos.map((auto) => (
                  <Card key={auto.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-muted">
                      <Image
                        src={auto.imagenUrl || "/placeholder.svg"}
                        alt={`${auto.marca} ${auto.modelo} ${auto.anio}`}
                        fill
                        className="object-cover"
                      />
                      {auto.estado === "Disponible" ? (
                        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Disponible</Badge>
                      ) : (
                        <Badge className="absolute top-4 right-4" variant="secondary">
                          {auto.estado}
                        </Badge>
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
            )}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
