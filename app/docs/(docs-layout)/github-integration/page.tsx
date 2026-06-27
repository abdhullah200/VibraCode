import type { Metadata } from "next"

import { DocsPageHeader } from "@/features/docs/components/docs-page-header"
import { DocsPager } from "@/features/docs/components/docs-pager"
import { DocsCallout } from "@/features/docs/components/docs-callout"
import { NumberedSteps } from "@/features/docs/components/numbered-steps"

export const metadata: Metadata = {
  title: "GitHub Integration",
  description: "How to connect your GitHub account and browse your repositories.",
}

export default function GitHubIntegrationPage() {
  return (
    <div className="flex flex-col gap-10">
      <DocsPageHeader
        title="GitHub Integration"
        description="Connect your GitHub account to browse your repositories without leaving the IDE."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Connecting your account</h2>
        <NumberedSteps
          steps={[
            {
              title: "Open the GitHub panel",
              description: "From a playground, open the GitHub connect dialog from the toolbar.",
            },
            {
              title: "Link your account, if needed",
              description:
                "If you originally signed in with Google, you'll be prompted to also sign in with GitHub so Xynraco can read your repositories.",
            },
            {
              title: "Approve access",
              description: "Approve the requested permissions on GitHub's authorization screen.",
            },
            {
              title: "You're connected",
              description:
                "Once linked, the dialog loads your repositories automatically the next time you open it.",
            },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Browsing your repositories</h2>
        <p className="leading-relaxed text-muted-foreground">
          Once connected, the GitHub panel lists your repositories with their visibility, star
          count, and fork count. Use the search field to filter by name, then select a repository
          to work with it inside Xynraco.
        </p>
      </section>

      <DocsCallout variant="note">
        Signing in with GitHub for authentication and connecting GitHub for repository access are
        separate steps. You can sign in with Google and still connect GitHub afterward.
      </DocsCallout>

      <DocsPager currentHref="/docs/github-integration" />
    </div>
  )
}