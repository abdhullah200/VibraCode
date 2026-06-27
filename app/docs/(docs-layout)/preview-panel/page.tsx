import type { Metadata } from "next"

import { DocsPageHeader } from "@/features/docs/components/docs-page-header"
import { DocsPager } from "@/features/docs/components/docs-pager"
import { DocsCallout } from "@/features/docs/components/docs-callout"
import { NumberedSteps } from "@/features/docs/components/numbered-steps"

export const metadata: Metadata = {
  title: "Preview Panel",
  description: "How the live preview works and how to show or hide it.",
}

export default function PreviewPanelPage() {
  return (
    <div className="flex flex-col gap-10">
      <DocsPageHeader
        title="Preview Panel"
        description="The preview panel runs your actual app, not a mock, right next to the editor."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">What is the live preview?</h2>
        <p className="leading-relaxed text-muted-foreground">
          Xynraco boots a real Node.js environment in your browser using WebContainers, installs
          your dependencies, and runs your project's dev server. The preview panel shows the
          actual rendered output of that running process, in real time.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Showing and hiding the preview</h2>
        <NumberedSteps
          steps={[
            {
              title: "Find the preview toggle",
              description:
                "Look for the Show Preview / Hide Preview control in the playground toolbar.",
            },
            {
              title: "Toggle it",
              description:
                "Click it to hide the preview and give the editor the full width, or click it again to bring the preview back.",
            },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">How it updates</h2>
        <p className="leading-relaxed text-muted-foreground">
          The preview is connected to the WebContainer's running dev server. When you save a
          file, that process picks up the change and the preview reflects it, the same way it
          would with hot reload on your own machine, without any deploys.
        </p>
      </section>

      <DocsCallout variant="tip">
        If the preview looks stuck, save your file again. The first build after creating a
        playground can take a few extra seconds while dependencies install.
      </DocsCallout>

      <DocsPager currentHref="/docs/preview-panel" />
    </div>
  )
}