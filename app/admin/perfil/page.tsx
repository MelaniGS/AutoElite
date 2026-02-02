"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { updatePersona, getPersonaById } from "@/lib/api"
import { User, Mail, Phone, MapPin, Lock } from "lucide-react"

export default function PerfilPage() {
    const { toast } = useToast()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        dni: "",
        password: "",
    })

    useEffect(() => {
        const fetchUserData = async () => {
            const userStr = localStorage.getItem("adminUser")
            if (userStr) {
                const userData = JSON.parse(userStr)
                setUser(userData)

                // Fetch latest data from API to ensure we have everything
                try {
                    const latestData = await getPersonaById(userData.id)
                    if (latestData) {
                        setFormData({
                            nombre: latestData.nombre || "",
                            apellido: latestData.apellido || "",
                            email: latestData.email || "",
                            telefono: latestData.telefono || "",
                            direccion: latestData.direccion || "",
                            dni: latestData.dni || "",
                            password: "", // Keep password empty initially
                        })
                        // Update localStorage with latest data (excluding password)
                        localStorage.setItem("adminUser", JSON.stringify({ ...userData, ...latestData }))
                        setUser({ ...userData, ...latestData })
                    }
                } catch (err) {
                    console.error("Error fetching latest user data:", err)
                }
            }
        }

        fetchUserData()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Create update object
            const updateData: any = { ...formData }

            // Only include password if the user actually typed something
            if (!formData.password) {
                delete updateData.password
            }

            const updated = await updatePersona(user.id, updateData)

            // Update local storage and state
            const newUser = { ...user, ...updated }
            localStorage.setItem("adminUser", JSON.stringify(newUser))
            setUser(newUser)

            // Clear password field after successful update
            setFormData(prev => ({ ...prev, password: "" }))

            toast({
                title: "Perfil actualizado",
                description: "Tus datos (incluyendo contraseña si fue cambiada) se han guardado correctamente.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar el perfil.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        const userStr = localStorage.getItem("adminUser")
        if (userStr) {
            const userData = JSON.parse(userStr)
            setFormData({
                nombre: userData.nombre || "",
                apellido: userData.apellido || "",
                email: userData.email || "",
                telefono: userData.telefono || "",
                direccion: userData.direccion || "",
                dni: userData.dni || "",
                password: "",
            })
            toast({
                title: "Cambios cancelados",
                description: "Se han restaurado tus datos originales.",
            })
        }
    }

    if (!user) return null

    return (
        <>
            <AdminHeader title="Mi Perfil" description="Gestiona tu información personal" />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos Personales</CardTitle>
                            <CardDescription>Actualiza tu información de contacto y cuenta.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre">Nombre</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="nombre"
                                                className="pl-10"
                                                value={formData.nombre}
                                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="apellido">Apellido</Label>
                                        <Input
                                            id="apellido"
                                            value={formData.apellido}
                                            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            className="pl-10"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="telefono">Teléfono</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="telefono"
                                                className="pl-10"
                                                value={formData.telefono}
                                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dni">DNI / Pasaporte</Label>
                                        <Input
                                            id="dni"
                                            value={formData.dni}
                                            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="direccion">Ciudad / Dirección</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="direccion"
                                            className="pl-10"
                                            value={formData.direccion}
                                            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                            placeholder="Ej: Madrid, Calle Falsa 123"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Nueva Contraseña (dejar en blanco para no cambiar)</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            className="pl-10"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <p className="text-sm text-muted-foreground italic">Rol actual: <span className="font-semibold text-primary">{user.rol}</span></p>
                                    <div className="flex gap-3 w-full sm:w-auto">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleCancel}
                                            disabled={loading}
                                            className="flex-1 sm:flex-none"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 sm:flex-none"
                                        >
                                            {loading ? "Guardando..." : "Guardar Cambios"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}
