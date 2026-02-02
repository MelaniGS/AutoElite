"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Si estamos en la página de login, no verificar auth
    if (pathname === "/admin/login") {
      setIsAuthorized(true)
      return
    }

    const startCheck = () => {
      const userStr = localStorage.getItem("adminUser")
      if (!userStr) {
        router.push("/admin/login")
      } else {
        try {
          const user = JSON.parse(userStr)
          const role = user.rol

          // Check permissions based on role
          if (role === "CLIENTE") {
            const allowedPaths = ["/admin/reservas", "/admin/perfil"]
            const isAllowed = allowedPaths.some(path => pathname === path || pathname.startsWith(path + "/"))
            if (!isAllowed) {
              router.push("/admin/reservas")
              return
            }
          }

          if (role === "EMPLEADO") {
            const allowedPaths = ["/admin/autos", "/admin/reservas", "/admin/perfil"]
            const isAllowed = allowedPaths.some(path => pathname === path || pathname.startsWith(path + "/"))

            if (!isAllowed) {
              router.push("/admin/autos")
              return
            }
          }

          setIsAuthorized(true)
        } catch (e) {
          router.push("/admin/login")
        }
      }
    }

    // Pequeño delay para asegurar hidratación
    startCheck()
  }, [pathname, router])

  // Si es la página de login, renderizar sin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (!isAuthorized) {
    return null // O un loading spinner
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
