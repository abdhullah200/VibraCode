"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { HttpMethod } from "@/features/api-test/lib/endpoints"

export interface HistoryEntry {
  id: string
  method: HttpMethod | string
  url: string
  status: number
  durationMs: number
  timestamp: string
}

interface HistoryPanelProps {
  entries: HistoryEntry[]
  onSelect: (entry: HistoryEntry) => void
  onClear: () => void
}

function statusColor(status: number): string {
  if (status === 0) return "text-red-500"
  if (status < 300) return "text-emerald-500"
  if (status < 400) return "text-blue-500"
  if (status < 500) return "text-amber-500"
  return "text-red-500"
}

export function HistoryPanel({ entries, onSelect, onClear }: HistoryPanelProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">History</span>
        {entries.length > 0 && (
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={onClear}>
            Clear
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="text-xs text-muted-foreground">Requests you send will appear here.</p>
      ) : (
        <ScrollArea className="max-h-[220px]">
          <div className="flex flex-col gap-1">
            {entries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => onSelect(entry)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted"
              >
                <Badge variant="outline" className="w-14 shrink-0 justify-center font-mono text-[10px]">
                  {entry.method}
                </Badge>
                <span className="min-w-0 flex-1 truncate font-mono">{entry.url}</span>
                <span className={cn("shrink-0 font-mono", statusColor(entry.status))}>{entry.status || "ERR"}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
