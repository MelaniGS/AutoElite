"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { getAutos, registerPersona, loginPersona, createReserva, getFooterData } from "@/lib/api"
import type { Auto } from "@/lib/types"

export default function ContactoPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [autos, setAutos] = useState<Auto[]>([])
  const [isEmployee, setIsEmployee] = useState(false)
  const [contactData, setContactData] = useState<any[]>([])

  useEffect(() => {
    getAutos().then(setAutos).catch(console.error)
    getFooterData().then(setContactData).catch(() => setContactData([]))
  }, [])

  const getValue = (key: string, defaultVal: string) =>
    contactData.find((d: any) => d.keyName === key)?.value || defaultVal

  const phone = getValue("phone", "+34 900 123 456")
  const email = getValue("email", "info@autopremier.com")

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    password: "",
    autoId: "",
    fechaInicio: "",
    fechaFin: "",
    mensaje: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!isEmployee && !formData.autoId) {
        toast({ title: "Atención", description: "Selecciona un auto para reservar", variant: "destructive" })
        setLoading(false)
        return
      }

      let personaId: number | null = null;
      let user = null;

      // 1. Try Login
      try {
        user = await loginPersona({ email: formData.email, password: formData.password })
        personaId = user.id
      } catch (e) {
        // Login failed, try Register
        try {
          const newPersona = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            telefono: formData.telefono,
            dni: formData.dni,
            password: formData.password,
            direccion: "",
            activo: true,
            rol: isEmployee ? "EMPLEADO" : "CLIENTE"
          }
          user = await registerPersona(newPersona)
          personaId = user.id

          toast({
            title: isEmployee ? "Solicitud Enviada" : "Registro Exitoso",
            description: isEmployee ? "Te has registrado como candidato/empleado." : "Usuario registrado exitosamente.",
          })
        } catch (regError: any) {
          throw new Error("No se pudo iniciar sesión ni registrar: " + regError.message)
        }
      }

      if (!personaId) throw new Error("Error identificando a la persona")

      // Store session
      localStorage.setItem("persona", JSON.stringify(user))

      // 2. Create Reservation (Only if NOT registering as employee)
      if (!isEmployee) {
        await createReserva({
          personaId,
          autoId: Number(formData.autoId),
          fechaInicio: formData.fechaInicio,
          fechaFin: formData.fechaFin,
          estado: "Pendiente",
          comentarios: formData.mensaje,
          montoTotal: 0,
          fechaReserva: new Date().toISOString()
        })

        toast({
          title: "Reserva Creada",
          description: "Tu reserva se ha generado correctamente. Revisa tu panel.",
        })

        router.push("/panel")
      } else {
        // If employee/candidate
        toast({
          title: "Registro Completado",
          description: "Tus datos han sido registrados.",
        })
        router.push("/")
      }


    } catch (error: any) {
      console.error(error)
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al procesar la solicitud",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12" aria-labelledby="contact-heading">
          <div className="container px-4 mx-auto text-center">
            <h1 id="contact-heading" className="text-4xl font-bold tracking-tight text-balance">
              Contáctanos y Reserva
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
              Reserva tu vehículo ideal o únete a nuestro equipo
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información</CardTitle>
                    <CardDescription>Detalles de contacto</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-sm font-medium">Teléfono</p>
                        <p className="text-sm text-muted-foreground">{phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{isEmployee ? "Registro de Empleado / Candidato" : "Formulario de Reserva"}</CardTitle>
                    <CardDescription>
                      {isEmployee
                        ? "Ingresa tus datos para registrarte en nuestra base de datos de empleados."
                        : "Ingresa tus datos y selecciona el auto. Si ya tienes cuenta, usa tu contraseña."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                      <div className="flex items-center space-x-2 border p-4 rounded-md bg-muted/20">
                        <input
                          type="checkbox"
                          id="employee-check"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={isEmployee}
                          onChange={(e) => setIsEmployee(e.target.checked)}
                        />
                        <Label htmlFor="employee-check" className="font-medium cursor-pointer">
                          ¿Quieres formar parte del equipo? (Registrarse como empleado)
                        </Label>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre *</Label>
                          <Input id="nombre" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apellido">Apellido *</Label>
                          <Input id="apellido" required value={formData.apellido} onChange={e => setFormData({ ...formData, apellido: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Contraseña (Login/Registro) *</Label>
                          <Input id="password" type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono *</Label>
                          <Input id="telefono" required value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dni">DNI/Pasaporte *</Label>
                          <Input id="dni" required value={formData.dni} onChange={e => setFormData({ ...formData, dni: e.target.value })} />
                        </div>
                      </div>

                      {!isEmployee && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="auto">Vehículo de Interés *</Label>
                            <Select onValueChange={(v) => setFormData({ ...formData, autoId: v })} value={formData.autoId}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un auto" />
                              </SelectTrigger>
                              <SelectContent>
                                {autos.filter(a => a.estado === 'Disponible').map(auto => (
                                  <SelectItem key={auto.id} value={auto.id.toString()}>
                                    {auto.marca} {auto.modelo} ({auto.anio}) - €{auto.precio}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="fechaInicio">Fecha Inicio *</Label>
                              <Input id="fechaInicio" type="date" required value={formData.fechaInicio} onChange={e => setFormData({ ...formData, fechaInicio: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="fechaFin">Fecha Fin *</Label>
                              <Input id="fechaFin" type="date" required value={formData.fechaFin} onChange={e => setFormData({ ...formData, fechaFin: e.target.value })} />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="mensaje">Comentarios Adicionales</Label>
                        <Textarea id="mensaje" value={formData.mensaje} onChange={e => setFormData({ ...formData, mensaje: e.target.value })} placeholder="Dudas, horarios preferentes..." />
                      </div>

                      <Button type="submit" size="lg" disabled={loading} className="w-full">
                        {loading ? "Procesando..." : (isEmployee ? "Registrarme" : "Confirmar Reserva")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
