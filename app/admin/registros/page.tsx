
"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getPersonas, updatePersona } from "@/lib/api"
import type { Persona } from "@/lib/types"
import { format } from "date-fns"

export default function RegistrosPage() {
    const { toast } = useToast()
    const [personas, setPersonas] = useState<Persona[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPersonas()
    }, [])

    const fetchPersonas = async () => {
        try {
            const data = await getPersonas()
            // Sort by registration date descending (newest first)
            // Assuming fechaRegistro is ISO string. If undefined, put at bottom.
            const sorted = data.sort((a, b) => {
                if (!a.fechaRegistro) return 1
                if (!b.fechaRegistro) return -1
                return new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime()
            })
            setPersonas(sorted)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleRoleChange = async (persona: Persona, newRole: string) => {
        try {
            await updatePersona(persona.id, { rol: newRole })
            toast({ title: "Rol Actualizado", description: `El usuario ahora es ${newRole}` })
            fetchPersonas()
        } catch (e) {
            toast({ title: "Error", description: "No se pudo actualizar el rol", variant: "destructive" })
        }
    }

    return (
        <>
            <AdminHeader title="Registro de Personas" description="Ver y gestionar nuevos registros" />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha Registro</TableHead>
                                <TableHead>Persona</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Rol Actual</TableHead>
                                <TableHead>Asignar Rol</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={5}>Cargando...</TableCell></TableRow>
                            ) : personas.map(persona => (
                                <TableRow key={persona.id}>
                                    <TableCell>
                                        {persona.fechaRegistro
                                            ? format(new Date(persona.fechaRegistro), "dd/MM/yyyy HH:mm")
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{persona.nombre} {persona.apellido}</div>
                                        <div className="text-xs text-muted-foreground">ID: {persona.id}</div>
                                    </TableCell>
                                    <TableCell>{persona.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={persona.rol === 'ADMIN' ? 'destructive' : persona.rol === 'EMPLEADO' ? 'default' : 'secondary'}>
                                            {persona.rol || 'CLIENTE'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={persona.rol || "CLIENTE"}
                                            onValueChange={(val) => handleRoleChange(persona, val)}
                                        >
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="CLIENTE">Cliente</SelectItem>
                                                <SelectItem value="EMPLEADO">Empleado</SelectItem>
                                                <SelectItem value="ADMIN">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </>
    )
}
