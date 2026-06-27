import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { getAdjacentDocs } from "@/features/docs/lib/nav-items"

interface DocsPagerProps {
  currentHref: string
}

export function DocsPager({ currentHref }: DocsPagerProps) {
  const { prev, next } = getAdjacentDocs(currentHref)

  if (!prev && !next) {
    return null
  }

  return (
    <nav aria-label="Pagination" className="grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="group">
          <Card className="h-full transition-colors group-hover:border-primary/50">
            <CardContent className="flex items-center gap-3 p-4">
              <ArrowLeft
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Previous</span>
                <span className="text-sm font-medium">{prev.title}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={next.href} className="group">
          <Card className="h-full transition-colors group-hover:border-primary/50">
            <CardContent className="flex items-center justify-end gap-3 p-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Next</span>
                <span className="text-sm font-medium">{next.title}</span>
              </div>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}