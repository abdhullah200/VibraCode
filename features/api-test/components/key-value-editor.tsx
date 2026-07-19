"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { KeyValue } from "@/features/api-test/lib/request-runner"

interface KeyValueEditorProps {
  title: string
  rows: KeyValue[]
  onChange: (rows: KeyValue[]) => void
  keyPlaceholder?: string
  valuePlaceholder?: string
  lockedKeys?: string[] // keys that cannot be renamed or removed (e.g. required path/query params)
}

export function KeyValueEditor({
  title,
  rows,
  onChange,
  keyPlaceholder = "key",
  valuePlaceholder = "value",
  lockedKeys = [],
}: KeyValueEditorProps) {
  const updateRow = (index: number, field: keyof KeyValue, value: string) => {
    const next = [...rows]
    next[index] = { ...next[index], [field]: value }
    onChange(next)
  }

  const addRow = () => onChange([...rows, { key: "", value: "" }])
  const removeRow = (index: number) => onChange(rows.filter((_, i) => i !== index))

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{title}</label>
        <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs" onClick={addRow}>
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>

      {rows.length === 0 && <p className="text-xs text-muted-foreground">None set.</p>}

      <div className="flex flex-col gap-2">
        {rows.map((row, index) => {
          const locked = lockedKeys.includes(row.key)
          return (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={row.key}
                placeholder={keyPlaceholder}
                disabled={locked}
                onChange={(e) => updateRow(index, "key", e.target.value)}
                className="font-mono text-xs"
              />
              <Input
                value={row.value}
                placeholder={valuePlaceholder}
                onChange={(e) => updateRow(index, "value", e.target.value)}
                className="font-mono text-xs"
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 shrink-0 p-0 text-muted-foreground hover:text-destructive"
                onClick={() => removeRow(index)}
                disabled={locked}
                aria-label="Remove row"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
