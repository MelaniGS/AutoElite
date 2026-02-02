"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { getReservasPersona } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PanelPage() {
    const router = useRouter()
    const [persona, setPersona] = useState<any>(null)
    const [reservas, setReservas] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Run only on client
        const stored = localStorage.getItem("persona")
        if (!stored) {
            router.push("/login")
            return
        }
        const user = JSON.parse(stored)
        setPersona(user)

        getReservasPersona(user.id)
            .then(data => setReservas(data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [router])

    if (!persona) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-1 container py-8 mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Panel de Usuario</h1>
                <div className="mb-8 p-6 bg-muted/50 rounded-lg border">
                    <h2 className="text-xl font-semibold">Hola, {persona.nombre} {persona.apellido}</h2>
                    <p className="text-muted-foreground">{persona.email}</p>
                    <p className="text-sm text-muted-foreground mt-2">ID: {persona.id}</p>
                </div>

                <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
                {loading ? <p>Cargando reservas...</p> : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {reservas.length === 0 ? <p className="text-muted-foreground col-span-full">No tienes reservas activas.</p> : reservas.map((res: any) => (
                            <Card key={res.id} className="overflow-hidden">
                                <CardHeader className="bg-muted/30 pb-3">
                                    <CardTitle className="text-lg flex justify-between items-center">
                                        <span>Reserva #{res.id}</span>
                                        <Badge variant={res.estado === 'Pendiente' ? 'secondary' : 'default'}>
                                            {res.estado}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-2">
                                    {res.auto && (
                                        <div className="font-medium text-lg">
                                            {res.auto.marca} {res.auto.modelo} ({res.auto.anio})
                                        </div>
                                    )}
                                    <div className="text-sm space-y-1 text-muted-foreground">
                                        <p>Desde: <span className="text-foreground">{res.fechaInicio}</span></p>
                                        <p>Hasta: <span className="text-foreground">{res.fechaFin}</span></p>
                                    </div>
                                    {res.notas && (
                                        <div className="mt-2 text-sm italic border-t pt-2">
                                            "{res.notas}"
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
            <PublicFooter />
        </div>
    )
}
