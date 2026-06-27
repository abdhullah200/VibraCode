import type { Metadata } from "next"
import Link from "next/link"
import { Code2, Compass, Database, FlameIcon, Lightbulb, Terminal, Zap } from "lucide-react"

import { DocsPageHeader } from "@/features/docs/components/docs-page-header"
import { DocsPager } from "@/features/docs/components/docs-pager"
import { DocsCallout } from "@/features/docs/components/docs-callout"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Introduction",
  description: "What Xynraco is, who it's for, and what you can build with it.",
}

const templates = [
  { name: "React", icon: Zap },
  { name: "Next.js", icon: Lightbulb },
  { name: "Express", icon: Database },
  { name: "Vue", icon: Compass },
  { name: "Hono", icon: FlameIcon },
  { name: "Angular", icon: Terminal },
] as const

export default function IntroductionPage() {
  return (
    <div className="flex flex-col gap-10">
      <DocsPageHeader
        title="Introduction"
        description="Xynraco is a browser-based IDE that lets you build, run, and preview full projects without installing anything locally."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">What is Xynraco?</h2>
        <p className="leading-relaxed text-muted-foreground">
          Xynraco runs a real Node.js environment directly in your browser using WebContainers.
          You write code in a Monaco-powered editor, see a live preview update as you save, and
          get AI-assisted code suggestions while you work, all without spinning up a local dev
          server.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Who is it for?</h2>
        <p className="leading-relaxed text-muted-foreground">
          Xynraco is built for developers who want to prototype an idea, follow a tutorial, or
          share a runnable project without context-switching to a local setup. It works well for
          quick experiments, coding interviews, learning a new framework, or pairing on a small
          project.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">What can you build?</h2>
        <p className="leading-relaxed text-muted-foreground">
          Every playground starts from a template. Pick the stack that matches what you want to
          build:
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.name}>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-4">
                <template.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <DocsCallout variant="tip" title="New here?">
        Start with{" "}
        <Link href="/docs/signing-in" className="font-medium underline underline-offset-4">
          Signing In
        </Link>{" "}
        and then{" "}
        <Link
          href="/docs/creating-a-playground"
          className="font-medium underline underline-offset-4"
        >
          Creating a Playground
        </Link>{" "}
        to get a project running in under a minute.
      </DocsCallout>

      <div className="flex justify-end">
        <Button asChild>
          <Link href="/docs/signing-in">Get started</Link>
        </Button>
      </div>

      <DocsPager currentHref="/docs" />
    </div>
  )
}