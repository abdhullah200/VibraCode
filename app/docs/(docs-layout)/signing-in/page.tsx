import type { Metadata } from "next"

import { DocsPageHeader } from "@/features/docs/components/docs-page-header"
import { DocsPager } from "@/features/docs/components/docs-pager"
import { DocsCallout } from "@/features/docs/components/docs-callout"
import { NumberedSteps } from "@/features/docs/components/numbered-steps"

export const metadata: Metadata = {
  title: "Signing In",
  description: "How to sign in to Xynraco with GitHub or Google.",
}

export default function SigningInPage() {
  return (
    <div className="flex flex-col gap-10">
      <DocsPageHeader
        title="Signing In"
        description="Xynraco uses GitHub or Google to sign you in. There's no separate password to create or remember."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Sign in with GitHub or Google</h2>
        <NumberedSteps
          steps={[
            {
              title: "Open the sign-in page",
              description:
                "Go to Xynraco and click Sign In. You'll see two options: Sign in with Google and Sign in with GitHub.",
            },
            {
              title: "Choose a provider",
              description:
                "Click whichever account you want to use. You're redirected to GitHub or Google to confirm access.",
            },
            {
              title: "Approve access",
              description: "Review the permissions requested and approve them to continue.",
            },
            {
              title: "You're redirected back in",
              description:
                "After approving, you're sent straight to your dashboard, already signed in.",
            },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">What happens after you sign in?</h2>
        <p className="leading-relaxed text-muted-foreground">
          The first time you sign in, Xynraco creates your account automatically. You land on
          your dashboard, where your playgrounds live, and your session stays active until you
          sign out or it expires.
        </p>
      </section>

      <DocsCallout variant="note">
        Signing in with GitHub does not automatically connect your repositories for browsing
        inside the IDE. That's a separate step, covered in GitHub Integration.
      </DocsCallout>

      <DocsPager currentHref="/docs/signing-in" />
    </div>
  )
}