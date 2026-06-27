import type { ReactNode } from "react"

interface DocsPageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function DocsPageHeader({ title, description, children }: DocsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {description && <p className="text-lg text-muted-foreground">{description}</p>}
      {children}
    </div>
  )
}