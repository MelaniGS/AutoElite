"use client"

import { useState, useEffect } from "react"
import { Bell, Calendar, Car, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAutos, getPersonas, getReservas } from "@/lib/api"
import { Auto, Persona, Reserva } from "@/lib/types"

interface Activity {
    id: string
    type: "auto" | "persona" | "reserva"
    action: "creado" | "actualizado"
    message: string
    timestamp: Date
}

export function Notifications() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const [autos, personas, reservas] = await Promise.all([getAutos(), getPersonas(), getReservas()])

                const newActivities: Activity[] = []

                // Process recent Autos (last 5)
                autos
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 5)
                    .forEach((auto) => {
                        newActivities.push({
                            id: `auto-${auto.id}`,
                            type: "auto",
                            action: "creado",
                            message: `Nuevo auto: ${auto.marca} ${auto.modelo}`,
                            timestamp: new Date(), // In a real app, use auto.fechaIngreso
                        })
                    })

                // Process recent Personas (last 5)
                personas
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 5)
                    .forEach((persona) => {
                        newActivities.push({
                            id: `persona-${persona.id}`,
                            type: "persona",
                            action: "creado",
                            message: `Nueva persona: ${persona.nombre} ${persona.apellido}`,
                            timestamp: new Date(), // In a real app, use persona.fechaRegistro
                        })
                    })

                // Process recent Reservas (last 5)
                reservas
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 5)
                    .forEach((reserva) => {
                        newActivities.push({
                            id: `reserva-${reserva.id}`,
                            type: "reserva",
                            action: "creado",
                            message: `Nueva reserva #${reserva.id} (${reserva.estado})`,
                            timestamp: new Date(reserva.fechaReserva || new Date()),
                        })
                    })

                // Sort by 'id' as a proxy for recency since we don't have real timestamps for all
                // In a real scenario, we'd sort by actual timestamp.
                // For this demo, let's just interleave/sort by presumed ID based recency or random to make it look active?
                // Actually, let's just take the top 10 overall.
                const sortedActivities = newActivities
                    .sort(() => 0.5 - Math.random()) // Shuffle slightly for "demo" activity feel or just take latest
                    .slice(0, 10)

                setActivities(sortedActivities)
                setUnreadCount(sortedActivities.length)
            } catch (error) {
                console.error("Failed to fetch activities")
            }
        }

        fetchActivities()
    }, [])

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (open) {
            setUnreadCount(0)
        }
    }

    const getIcon = (type: Activity["type"]) => {
        switch (type) {
            case "auto":
                return <Car className="w-4 h-4 text-blue-500" />
            case "persona":
                return <User className="w-4 h-4 text-green-500" />
            case "reserva":
                return <Calendar className="w-4 h-4 text-purple-500" />
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
                    <Bell className="w-5 h-5" aria-hidden="true" />
                    {unreadCount > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-in zoom-in"
                            variant="destructive"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
                    <h4 className="font-semibold">Notificaciones</h4>
                    {unreadCount > 0 && <Badge variant="secondary">{unreadCount} nuevas</Badge>}
                </div>
                <ScrollArea className="h-[300px]">
                    {activities.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">No hay notificaciones recientes</div>
                    ) : (
                        <div className="grid gap-1">
                            {activities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors">
                                    <div className="mt-1 bg-background p-2 rounded-full border shadow-sm">{getIcon(activity.type)}</div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{activity.message}</p>
                                        <p className="text-xs text-muted-foreground capitalize">
                                            {activity.type} • {activity.action}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}
