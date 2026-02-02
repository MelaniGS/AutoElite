"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import type { Persona } from "@/lib/types"
import { getPersonas, createPersona, updatePersona, deletePersona } from "@/lib/api"

export default function PersonasPage() {
  const { toast } = useToast()
  const [personas, setPersonas] = useState<Persona[]>([])
  const [filteredPersonas, setFilteredPersonas] = useState<Persona[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null)
  const [deletingPersona, setDeletingPersona] = useState<Persona | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    dni: "",
    rol: "CLIENTE",
    activo: true,
  })

  useEffect(() => {
    fetchPersonas()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = personas.filter(
        (persona) =>
          persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          persona.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          persona.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          persona.dni.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredPersonas(filtered)
    } else {
      setFilteredPersonas(personas)
    }
  }, [searchTerm, personas])

  const fetchPersonas = async () => {
    try {
      const data = await getPersonas()
      setPersonas(data)
      setFilteredPersonas(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las personas",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (persona?: Persona) => {
    if (persona) {
      setEditingPersona(persona)
      setFormData({
        nombre: persona.nombre || "",
        apellido: persona.apellido || "",
        email: persona.email || "",
        telefono: persona.telefono || "",
        direccion: persona.direccion || "",
        dni: persona.dni || "",
        rol: persona.rol || "CLIENTE",
        activo: persona.activo !== undefined ? persona.activo : true,
      })
    } else {
      setEditingPersona(null)
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        dni: "",
        rol: "CLIENTE",
        activo: true,
      })
    }
    setDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingPersona) {
        await updatePersona(editingPersona.id, formData)
        toast({
          title: "Persona actualizada",
          description: "Los datos de la persona se han actualizado correctamente",
        })
      } else {
        await createPersona(formData)
        toast({
          title: "Registrado existosamente",
          description: "La persona se ha registrado correctamente",
        })
      }
      setDialogOpen(false)
      fetchPersonas()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la persona",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!deletingPersona) return

    try {
      await deletePersona(deletingPersona.id)
      toast({
        title: "Persona eliminada",
        description: "La persona ha sido eliminada correctamente",
      })
      setDeleteDialogOpen(false)
      fetchPersonas()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la persona",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <AdminHeader title="Gestión de Personas" description="Administra la información de los usuarios" />
      <main className="flex-1 overflow-y-auto p-6" role="main">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Buscar por nombre, email o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Buscar personas"
            />
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Nueva Persona
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPersonas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron personas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPersonas.map((persona) => (
                    <TableRow key={persona.id}>
                      <TableCell className="font-medium">
                        {persona.nombre} {persona.apellido}
                      </TableCell>
                      <TableCell>{persona.email}</TableCell>
                      <TableCell>{persona.telefono}</TableCell>
                      <TableCell>{persona.dni}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="mr-2">{persona.rol || 'CLIENTE'}</Badge>
                        {persona.activo ? (
                          <Badge variant="default">Activo</Badge>
                        ) : (
                          <Badge variant="secondary">Inactivo</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenDialog(persona)
                            }}
                            aria-label={`Editar persona ${persona.nombre} ${persona.apellido}`}
                          >
                            <Pencil className="w-4 h-4" aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDeletingPersona(persona)
                              setDeleteDialogOpen(true)
                            }}
                            aria-label={`Eliminar persona ${persona.nombre} ${persona.apellido}`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent aria-describedby="dialog-description">
            <DialogHeader>
              <DialogTitle>{editingPersona ? "Editar Persona" : "Nueva Persona"}</DialogTitle>
              <DialogDescription id="dialog-description">
                {editingPersona
                  ? "Actualiza la información de la persona"
                  : "Completa los datos para registrar una nueva persona"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    required
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rol">Rol</Label>
                <Select
                  value={formData.rol}
                  onValueChange={(value) => setFormData({ ...formData, rol: value })}
                >
                  <SelectTrigger id="rol">
                    <SelectValue placeholder="Seleccionar Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLIENTE">Cliente</SelectItem>
                    <SelectItem value="EMPLEADO">Empleado</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI *</Label>
                  <Input
                    id="dni"
                    required
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  required
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activo">Estado</Label>
                <Select
                  value={formData.activo ? "true" : "false"}
                  onValueChange={(value) => setFormData({ ...formData, activo: value === "true" })}
                >
                  <SelectTrigger id="activo">
                    <SelectValue placeholder="Seleccionar Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Activo</SelectItem>
                    <SelectItem value="false">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingPersona ? "Actualizar" : "Crear"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent aria-describedby="delete-dialog-description">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription id="delete-dialog-description">
                ¿Estás seguro de que deseas eliminar a {deletingPersona?.nombre} {deletingPersona?.apellido}? Esta
                acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}
