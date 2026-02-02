"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = "Algo salió mal",
  message = "No pudimos cargar esta información. Por favor, intenta de nuevo.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <Card className="max-w-md mx-auto my-8" role="alert" aria-live="assertive">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-destructive" aria-hidden="true" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      {onRetry && (
        <CardContent>
          <Button onClick={onRetry} variant="outline" className="w-full bg-transparent">
            Intentar nuevamente
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
