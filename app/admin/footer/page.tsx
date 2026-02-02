"use client"
import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { getFooterData, updateFooterData } from "@/lib/api"

export default function AdminFooterPage() {
    const { toast } = useToast()
    const [data, setData] = useState({
        address: "",
        phone: "",
        email: "",
        facebook: "",
        instagram: "",
        twitter: ""
    })

    useEffect(() => {
        getFooterData().then(items => {
            const newData = { ...data }
            items.forEach((item: any) => {
                if (Object.keys(newData).includes(item.keyName)) {
                    // @ts-ignore
                    newData[item.keyName] = item.value
                }
            })
            setData(newData)
        })
    }, [])

    const handleSave = async (key: string, value: string) => {
        try {
            await updateFooterData(key, value)
            toast({ title: "Guardado", description: `Campo ${key} actualizado.` })
        } catch (e) {
            toast({ title: "Error", variant: "destructive", description: "No se pudo guardar." })
        }
    }

    return (
        <>
            <AdminHeader title="Configuración del Sitio" description="Edita la información de contacto y redes sociales que se muestra en toda la página" />
            <main className="p-6 space-y-6 max-w-xl">
                {Object.keys(data).map((key) => (
                    <div key={key} className="space-y-2">
                        <Label className="capitalize">
                            {key === 'address' ? 'Dirección' :
                                key === 'phone' ? 'Teléfono de Contacto' :
                                    key === 'email' ? 'Email de Contacto' :
                                        key}
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                // @ts-ignore
                                value={data[key]}
                                // @ts-ignore
                                onChange={(e) => setData({ ...data, [key]: e.target.value })}
                            />
                            <Button onClick={() => handleSave(key, (data as any)[key])}>Guardar</Button>
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}
