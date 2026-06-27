import type { Metadata } from "next"

import { DocsPageHeader } from "@/features/docs/components/docs-page-header"
import { DocsPager } from "@/features/docs/components/docs-pager"
import { ShortcutKey } from "@/features/docs/components/shortcut-key"

export const metadata: Metadata = {
  title: "Keyboard Shortcuts",
  description: "Keyboard shortcuts for working faster in Xynraco.",
}

interface ShortcutEntry {
  keys: string[]
  description: string
}

const editorShortcuts: ShortcutEntry[] = [
  { keys: ["Ctrl", "S"], description: "Save the active file" },
  { keys: ["Ctrl", "Space"], description: "Trigger an AI code suggestion" },
  { keys: ["Tab"], description: "Accept the current AI suggestion" },
  { keys: ["Esc"], description: "Reject the current AI suggestion" },
]

const navigationShortcuts: ShortcutEntry[] = [
  { keys: ["Ctrl", "B"], description: "Toggle the sidebar" },
]

function ShortcutTable({ entries }: { entries: ShortcutEntry[] }) {
  return (
    <div className="flex flex-col divide-y rounded-lg border">
      {entries.map((entry) => (
        <div
          key={entry.description}
          className="flex items-center justify-between gap-4 px-4 py-3"
        >
          <span className="text-sm text-muted-foreground">{entry.description}</span>
          <ShortcutKey keys={entry.keys} />
        </div>
      ))}
    </div>
  )
}

export default function KeyboardShortcutsPage() {
  return (
    <div className="flex flex-col gap-10">
      <DocsPageHeader
        title="Keyboard Shortcuts"
        description="A few shortcuts make working in Xynraco noticeably faster."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Editor</h2>
        <ShortcutTable entries={editorShortcuts} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Navigation</h2>
        <ShortcutTable entries={navigationShortcuts} />
      </section>

      <p className="text-sm text-muted-foreground">
        On macOS, use Cmd in place of Ctrl for every shortcut above.
      </p>

      <DocsPager currentHref="/docs/keyboard-shortcuts" />
    </div>
  )
}