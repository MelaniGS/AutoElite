"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Plus, Pencil, Trash2, Search, ImageIcon } from "lucide-react"
import type { Auto } from "@/lib/types"
import { getAutos, createAuto, updateAuto, deleteAuto } from "@/lib/api"

export default function AutosPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [autos, setAutos] = useState<Auto[]>([])
  const [filteredAutos, setFilteredAutos] = useState<Auto[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingAuto, setEditingAuto] = useState<Auto | null>(null)
  const [deletingAuto, setDeletingAuto] = useState<Auto | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    anio: new Date().getFullYear(),
    precio: 0,
    kilometraje: 0,
    combustible: "Gasolina" as Auto["combustible"],
    transmision: "Manual" as Auto["transmision"],
    color: "",
    descripcion: "",
    imagenUrl: "",
    estado: "Disponible",
    caracteristicas: "",
  })

  useEffect(() => {
    fetchAutos()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = autos.filter(
        (auto) =>
          auto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
          auto.modelo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredAutos(filtered)
    } else {
      setFilteredAutos(autos)
    }
  }, [searchTerm, autos])

  const fetchAutos = async () => {
    try {
      const data = await getAutos()
      setAutos(data)
      setFilteredAutos(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los autos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const editId = searchParams.get("editId")
    if (editId && autos.length > 0) {
      const autoToEdit = autos.find((a) => a.id === Number(editId))
      if (autoToEdit) {
        handleOpenDialog(autoToEdit)
      }
    }
  }, [searchParams, autos])

  const handleOpenDialog = (auto?: Auto) => {
    console.log("Opening dialog for:", auto)
    if (auto) {
      setEditingAuto(auto)
      setFormData({
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        precio: auto.precio,
        kilometraje: auto.kilometraje,
        combustible: auto.combustible,
        transmision: auto.transmision,
        color: auto.color,
        descripcion: auto.descripcion,
        imagenUrl: auto.imagenUrl,
        estado: auto.estado,
        caracteristicas: (auto.caracteristicas || []).join(", "),
      })
    } else {
      setEditingAuto(null)
      setFormData({
        marca: "",
        modelo: "",
        anio: new Date().getFullYear(),
        precio: 0,
        kilometraje: 0,
        combustible: "Gasolina",
        transmision: "Manual",
        color: "",
        descripcion: "",
        imagenUrl: "",
        estado: "Disponible",
        caracteristicas: "",
      })
    }
    setDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const autoData = {
      ...formData,
      caracteristicas: formData.caracteristicas.split(",").map((c) => c.trim()),
    }

    try {
      if (editingAuto) {
        await updateAuto(editingAuto.id, autoData)
        toast({
          title: "Auto actualizado",
          description: "Los datos del vehículo se han actualizado correctamente",
        })
      } else {
        await createAuto(autoData)
        toast({
          title: "Auto creado",
          description: "El vehículo se ha registrado correctamente",
        })
      }
      setDialogOpen(false)
      fetchAutos()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el auto",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!deletingAuto) return

    try {
      await deleteAuto(deletingAuto.id)
      toast({
        title: "Auto eliminado",
        description: "El vehículo ha sido eliminado correctamente",
      })
      setDeleteDialogOpen(false)
      fetchAutos()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el auto",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <AdminHeader title="Gestión de Autos" description="Administra el inventario de vehículos" />
      <main className="flex-1 overflow-y-auto p-6" role="main">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Buscar vehículos"
            />
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Nuevo Auto
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
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Kilometraje</TableHead>
                  <TableHead>Combustible</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAutos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No se encontraron vehículos
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAutos.map((auto) => (
                    <TableRow key={auto.id}>
                      <TableCell className="font-medium">
                        {auto.marca} {auto.modelo}
                      </TableCell>
                      <TableCell>{auto.anio}</TableCell>
                      <TableCell>€{auto.precio.toLocaleString()}</TableCell>
                      <TableCell>{auto.kilometraje.toLocaleString()} km</TableCell>
                      <TableCell>{auto.combustible}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            auto.estado === "Disponible"
                              ? "default"
                              : auto.estado === "Vendido"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {auto.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenDialog(auto)
                            }}
                            aria-label={`Editar ${auto.marca} ${auto.modelo}`}
                          >
                            <Pencil className="w-4 h-4" aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDeletingAuto(auto)
                              setDeleteDialogOpen(true)
                            }}
                            aria-label={`Eliminar ${auto.marca} ${auto.modelo}`}
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="auto-dialog-description">
            <DialogHeader>
              <DialogTitle>{editingAuto ? "Editar Auto" : "Nuevo Auto"}</DialogTitle>
              <DialogDescription id="auto-dialog-description">
                {editingAuto
                  ? "Actualiza la información del vehículo"
                  : "Completa los datos para registrar un nuevo vehículo"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca *</Label>
                  <Input
                    id="marca"
                    required
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    required
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="anio">Año *</Label>
                  <Input
                    id="anio"
                    type="number"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.anio}
                    onChange={(e) => setFormData({ ...formData, anio: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precio">Precio (€) *</Label>
                  <Input
                    id="precio"
                    type="number"
                    required
                    min="0"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kilometraje">Kilometraje *</Label>
                  <Input
                    id="kilometraje"
                    type="number"
                    required
                    min="0"
                    value={formData.kilometraje}
                    onChange={(e) => setFormData({ ...formData, kilometraje: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="combustible">Combustible *</Label>
                  <Select
                    value={formData.combustible}
                    onValueChange={(value) => setFormData({ ...formData, combustible: value as Auto["combustible"] })}
                  >
                    <SelectTrigger id="combustible">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gasolina">Gasolina</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                      <SelectItem value="Híbrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmision">Transmisión *</Label>
                  <Select
                    value={formData.transmision}
                    onValueChange={(value) => setFormData({ ...formData, transmision: value as Auto["transmision"] })}
                  >
                    <SelectTrigger id="transmision">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automática">Automática</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color *</Label>
                  <Input
                    id="color"
                    required
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción *</Label>
                <Textarea
                  id="descripcion"
                  required
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagenUrl" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" aria-hidden="true" />
                  URL de Imagen
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="imagenUrl"
                    type="url"
                    value={formData.imagenUrl}
                    onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                <div className="pt-2">
                  <Label htmlFor="fileUpload" className="text-sm text-muted-foreground">O subir desde archivo:</Label>
                  <Input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return

                      const uploadData = new FormData()
                      uploadData.append("file", file)

                      try {
                        const res = await fetch("http://localhost:8999/api/uploads", {
                          method: "POST",
                          body: uploadData,
                        })
                        if (!res.ok) throw new Error("Error subiendo imagen")
                        const data = await res.json()
                        // Construir URL completa si es necesario, o usar relativa
                        // Asumiendo backend en 8999/api
                        const fullUrl = `http://localhost:8999/api${data.url}`
                        setFormData(prev => ({ ...prev, imagenUrl: fullUrl }))
                        toast({ title: "Imagen subida", description: "Imagen cargada con éxito" })
                      } catch (err) {
                        toast({ title: "Error", description: "Falló la subida de imagen", variant: "destructive" })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="caracteristicas">Características (separadas por comas)</Label>
                <Textarea
                  id="caracteristicas"
                  value={formData.caracteristicas}
                  onChange={(e) => setFormData({ ...formData, caracteristicas: e.target.value })}
                  placeholder="GPS, Bluetooth, Cámara trasera"
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) => setFormData({ ...formData, estado: value })}
                >
                  <SelectTrigger id="estado">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="Vendido">Vendido</SelectItem>
                    <SelectItem value="Reservado">Reservado</SelectItem>
                    <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingAuto ? "Actualizar" : "Crear"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent aria-describedby="delete-auto-dialog-description">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription id="delete-auto-dialog-description">
                ¿Estás seguro de que deseas eliminar el {deletingAuto?.marca} {deletingAuto?.modelo}? Esta acción no se
                puede deshacer.
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
