import { AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormFeedbackProps {
  type: "error" | "success"
  message: string
  className?: string
}

export function FormFeedback({ type, message, className }: FormFeedbackProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm p-3 rounded-md",
        type === "error" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent",
        className,
      )}
      role="alert"
      aria-live="polite"
    >
      {type === "error" ? (
        <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      ) : (
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      )}
      <span>{message}</span>
    </div>
  )
}
