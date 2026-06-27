import type { Metadata } from "next"
import { Code2, Compass, Database, FlameIcon, Lightbulb, Terminal, Zap } from "lucide-react"

import { DocsPageHeader } from "@/features/docs/components/docs-page-header"
import { DocsPager } from "@/features/docs/components/docs-pager"
import { DocsCallout } from "@/features/docs/components/docs-callout"
import { NumberedSteps } from "@/features/docs/components/numbered-steps"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Creating a Playground",
  description: "How to create a new playground and choose a template.",
}

const templates = [
  { name: "React", icon: Zap, description: "A component-based UI library" },
  { name: "Next.js", icon: Lightbulb, description: "Full-stack React framework" },
  { name: "Express", icon: Database, description: "Minimal Node.js backend" },
  { name: "Vue", icon: Compass, description: "Approachable frontend framework" },
  { name: "Hono", icon: FlameIcon, description: "Lightweight, edge-ready backend" },
  { name: "Angular", icon: Terminal, description: "Full-featured frontend framework" },
] as const

export default function CreatingAPlaygroundPage() {
  return (
    <div className="flex flex-col gap-10">
      <DocsPageHeader
        title="Creating a Playground"
        description="A playground is your project: a file tree, an editor, and a live preview, all running in one tab."
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Create a new playground</h2>
        <NumberedSteps
          steps={[
            {
              title: "Open your dashboard",
              description:
                "Sign in and go to your dashboard, where all your existing playgrounds are listed.",
            },
            {
              title: "Start a new playground",
              description:
                "Use the create action on the dashboard or sidebar to open the template picker.",
            },
            {
              title: "Choose a template",
              description:
                "Pick the stack you want to start from. Each template comes preconfigured with a working starter project.",
            },
            {
              title: "Name your playground",
              description:
                "Give it a short, descriptive title so you can find it later. You can rename it any time.",
            },
            {
              title: "Create it",
              description:
                "Confirm, and Xynraco provisions the playground and opens the editor for you.",
            },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Available templates</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {templates.map((template) => (
            <Card key={template.name}>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <template.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <CardTitle className="text-sm">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <DocsCallout variant="tip">
        Not sure which template to pick? Choose React or Next.js if you're building a UI, or
        Express or Hono if you just need an API to experiment with.
      </DocsCallout>

      <DocsPager currentHref="/docs/creating-a-playground" />
    </div>
  )
}