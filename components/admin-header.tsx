"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Notifications } from "@/components/notifications"

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="border-b bg-background" role="banner">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú de navegación">
            <Menu className="w-5 h-5" aria-hidden="true" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Notifications />
        </div>
      </div>
    </header>
  )
}
