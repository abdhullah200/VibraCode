import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface Step {
  title: string
  description: ReactNode
}

interface NumberedStepsProps {
  steps: Step[]
  className?: string
}

export function NumberedSteps({ steps, className }: NumberedStepsProps) {
  return (
    <ol className={cn("flex flex-col gap-6", className)}>
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
            {index + 1}
          </div>
          <div className="flex flex-col gap-1 pt-0.5">
            <p className="font-medium leading-none">{step.title}</p>
            <div className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}