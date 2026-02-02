import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Car, Calendar, TrendingUp, ArrowRight, Pencil } from "lucide-react"
import { getPersonas, getAutos, getReservas } from "@/lib/api"
import Link from "next/link"

export default async function AdminDashboard() {
  const [personas, autos, reservas] = await Promise.all([getPersonas(), getAutos(), getReservas()])

  const autosDisponibles = autos.filter((auto) => auto.estado === "Disponible").length
  const reservasPendientes = reservas.filter((r) => r.estado === "Pendiente").length
  const personasActivos = personas.filter((c) => c.activo).length

  return (
    <>
      <AdminHeader title="Dashboard" description="Vista general de tu concesionaria" />
      <main className="flex-1 overflow-y-auto p-6" role="main">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Personas</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{personas.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{personasActivos} activos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Autos</CardTitle>
              <Car className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{autos.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{autosDisponibles} disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reservas</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservas.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{reservasPendientes} pendientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€450K</div>
              <p className="text-xs text-muted-foreground mt-1">+12% vs mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Últimas Reservas</CardTitle>
              <Link href="/admin/reservas" className="text-sm text-primary hover:underline flex items-center">
                Ver todas <ArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservas.slice(0, 5).map((reserva) => (
                  <div
                    key={reserva.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {reserva.persona?.nombre} {reserva.persona?.apellido}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {reserva.auto?.marca} {reserva.auto?.modelo}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">€{(reserva.montoTotal || 0).toLocaleString()}</p>
                      <div className="flex items-center justify-end gap-2">
                        <p className="text-xs text-muted-foreground">{reserva.estado}</p>
                        <Link
                          href={`/admin/reservas?editId=${reserva.id}`}
                          className="p-1 hover:bg-muted rounded-full transition-colors"
                          aria-label="Editar reserva"
                        >
                          <Pencil className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Autos Más Vendidos</CardTitle>
              <Link href="/admin/autos" className="text-sm text-primary hover:underline flex items-center">
                Ver todos <ArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {autos.slice(0, 5).map((auto) => (
                  <div
                    key={auto.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {auto.marca} {auto.modelo}
                      </p>
                      <p className="text-xs text-muted-foreground">{auto.anio}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">€{(auto.precio || 0).toLocaleString()}</p>
                      <div className="flex items-center justify-end gap-2">
                        <p className="text-xs text-muted-foreground">
                          {auto.estado === "Disponible" ? "Disponible" : "Vendido"}
                        </p>
                        <Link
                          href={`/admin/autos?editId=${auto.id}`}
                          className="p-1 hover:bg-muted rounded-full transition-colors"
                          aria-label="Editar auto"
                        >
                          <Pencil className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
