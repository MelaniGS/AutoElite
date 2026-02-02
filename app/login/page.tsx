"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { loginPersona } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const user = await loginPersona({ email, password })
            // Save user to localStorage
            localStorage.setItem("persona", JSON.stringify(user))
            toast({
                title: "Bienvenido",
                description: `Has iniciado sesión como ${user.nombre}`,
            })
            router.push("/panel")
        } catch (error) {
            toast({
                title: "Error",
                description: "Credenciales incorrectas",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
                        <CardDescription>Ingresa a tu cuenta de usuario</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Ingresar
                            </Button>
                            <div className="text-center text-sm text-muted-foreground">
                                ¿No tienes cuenta?{" "}
                                <Link href="/contacto" className="underline hover:text-primary">
                                    Regístrate
                                </Link>
                                {" "}o contáctanos
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </main>
            <PublicFooter />
        </div>
    )
}
