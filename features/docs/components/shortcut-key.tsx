import { Kbd, KbdGroup } from "@/components/ui/kbd"

interface ShortcutKeyProps {
  keys: string[]
  label?: string
}

export function ShortcutKey({ keys, label }: ShortcutKeyProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <KbdGroup>
        {keys.map((key, index) => (
          <span key={key} className="inline-flex items-center gap-1">
            <Kbd>{key}</Kbd>
            {index < keys.length - 1 && <span className="text-muted-foreground">+</span>}
          </span>
        ))}
      </KbdGroup>
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </span>
  )
}