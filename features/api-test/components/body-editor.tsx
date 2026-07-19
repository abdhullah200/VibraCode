"use client"

import { useMemo } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"

interface BodyEditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function BodyEditor({ value, onChange, disabled }: BodyEditorProps) {
  const validation = useMemo(() => {
    if (!value.trim()) return { valid: true, message: null as string | null }
    try {
      JSON.parse(value)
      return { valid: true, message: "Valid JSON" }
    } catch (error) {
      return { valid: false, message: error instanceof Error ? error.message : "Invalid JSON" }
    }
  }, [value])

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Body</label>
        {value.trim() && (
          <span
            className={`flex items-center gap-1 text-xs ${validation.valid ? "text-emerald-500" : "text-destructive"}`}
          >
            {validation.valid ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
            {validation.message}
          </span>
        )}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? "This method does not send a body." : '{\n  "key": "value"\n}'}
        className="min-h-[180px] resize-y font-mono text-xs"
        spellCheck={false}
      />
    </div>
  )
}
