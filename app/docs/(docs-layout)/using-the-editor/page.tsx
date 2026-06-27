import type { Metadata } from "next"

import { DocsPageHeader } from "@/features/docs/components/docs-page-header"
import { DocsPager } from "@/features/docs/components/docs-pager"
import { DocsCallout } from "@/features/docs/components/docs-callout"
import { NumberedSteps } from "@/features/docs/components/numbered-steps"
import { ShortcutKey } from "@/features/docs/components/shortcut-key"

export const metadata: Metadata = {
  title: "Using the Editor",
  description: "How to open files, edit code, manage tabs, and save your work.",
}

export default function UsingTheEditorPage() {
  return (
    <div className="flex flex-col gap-10">
      <DocsPageHeader
        title="Using the Editor"
        description="The editor is where you'll spend most of your time inside a playground."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Opening files</h2>
        <p className="leading-relaxed text-muted-foreground">
          The file tree on the left shows every file and folder in your playground. Click a file
          to open it in the editor. Folders expand and collapse when you click them.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Working with tabs</h2>
        <NumberedSteps
          steps={[
            {
              title: "Open multiple files",
              description:
                "Every file you open from the file tree gets its own tab above the editor, so you can switch between files without losing your place.",
            },
            {
              title: "Switch between tabs",
              description: "Click a tab to bring that file into focus. The active tab is highlighted.",
            },
            {
              title: "Close a tab",
              description:
                "Use the close control on the tab to remove it from the open files list. This doesn't delete the file, it just closes the view.",
            },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Unsaved changes</h2>
        <p className="leading-relaxed text-muted-foreground">
          When a file has changes that haven't been saved, its tab shows a small dot next to the
          file name, and the editor header shows an "Unsaved changes" label. Saving clears the
          indicator for that file.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Saving your work</h2>
        <p className="leading-relaxed text-muted-foreground">You can save in two ways:</p>
        <ul className="flex flex-col gap-3 text-muted-foreground">
          <li className="flex items-center gap-2">
            <ShortcutKey keys={["Ctrl", "S"]} />
            <span>saves the file you're currently editing.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>
              Click <span className="font-medium text-foreground">Save</span> in the editor
              toolbar to save the active file, or <span className="font-medium text-foreground">Save All</span> to save every open file with unsaved changes at once.
            </span>
          </li>
        </ul>
      </section>

      <DocsCallout variant="note">
        On macOS, use Cmd instead of Ctrl for the same shortcut.
      </DocsCallout>

      <DocsPager currentHref="/docs/using-the-editor" />
    </div>
  )
}