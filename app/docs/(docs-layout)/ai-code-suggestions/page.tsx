import type { Metadata } from "next"

import { DocsPageHeader } from "@/features/docs/components/docs-page-header"
import { DocsPager } from "@/features/docs/components/docs-pager"
import { DocsCallout } from "@/features/docs/components/docs-callout"
import { NumberedSteps } from "@/features/docs/components/numbered-steps"
import { ShortcutKey } from "@/features/docs/components/shortcut-key"

export const metadata: Metadata = {
  title: "AI Code Suggestions",
  description: "How to enable, trigger, accept, and reject AI code suggestions.",
}

export default function AICodeSuggestionsPage() {
  return (
    <div className="flex flex-col gap-10">
      <DocsPageHeader
        title="AI Code Suggestions"
        description="Xynraco can suggest code inline as you type, similar to an autocomplete that understands your file."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Enabling AI suggestions</h2>
        <p className="leading-relaxed text-muted-foreground">
          AI suggestions are on by default in the editor. Use the AI toggle in the playground
          toolbar to turn suggestions on or off for your session. When it's off, Xynraco won't
          request or show any suggestions.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Triggering a suggestion</h2>
        <NumberedSteps
          steps={[
            {
              title: "Keep typing",
              description:
                "Suggestions can appear automatically as you type, after certain characters like brackets, dots, or new lines.",
            },
            {
              title: "Or trigger one manually",
              description: (
                <span className="inline-flex flex-wrap items-center gap-2">
                  Press <ShortcutKey keys={["Ctrl", "Space"]} /> at your cursor position to ask
                  for a suggestion right away.
                </span>
              ),
            },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Accepting or rejecting a suggestion
        </h2>
        <ul className="flex flex-col gap-3 text-muted-foreground">
          <li className="flex items-center gap-2">
            <ShortcutKey keys={["Tab"]} />
            <span>accepts the suggestion and inserts it into your file.</span>
          </li>
          <li className="flex items-center gap-2">
            <ShortcutKey keys={["Esc"]} />
            <span>dismisses the suggestion without inserting anything.</span>
          </li>
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          If you keep typing instead of accepting or rejecting, the suggestion is replaced with
          a new one based on your latest cursor position.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">What the AI can help with</h2>
        <p className="leading-relaxed text-muted-foreground">
          Suggestions are generated from the content of the file you're editing and your cursor
          position, so they're most useful for completing the line or block you're currently
          writing, filling in boilerplate like function signatures and imports, and continuing a
          pattern you've already started elsewhere in the file.
        </p>
      </section>

      <DocsCallout variant="warning">
        Always review a suggestion before accepting it. Treat it as a fast first draft, not a
        guaranteed-correct answer.
      </DocsCallout>

      <DocsPager currentHref="/docs/ai-code-suggestions" />
    </div>
  )
}