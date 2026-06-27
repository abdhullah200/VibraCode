import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Info, Lightbulb, TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type CalloutVariant = "note" | "tip" | "warning"

interface CalloutConfig {
  icon: LucideIcon
  label: string
  className: string
}

interface DocsCalloutProps {
  variant?: CalloutVariant
  title?: string
  children: ReactNode
  className?: string
}

const calloutConfig: Record<CalloutVariant, CalloutConfig> = {
  note: { icon: Info, label: "Note", className: "border-blue-500/30 [&>svg]:text-blue-500" },
  tip: { icon: Lightbulb, label: "Tip", className: "border-emerald-500/30 [&>svg]:text-emerald-500" },
  warning: { icon: TriangleAlert, label: "Warning", className: "border-amber-500/40 [&>svg]:text-amber-500" },
}

export function DocsCallout({ variant = "note", title, children, className }: DocsCalloutProps) {
  const config = calloutConfig[variant]
  const Icon = config.icon

  return (
    <Alert className={cn(config.className, className)}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      <AlertTitle>{title ?? config.label}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}