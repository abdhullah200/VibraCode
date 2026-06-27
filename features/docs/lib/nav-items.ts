import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  LogIn,
  FolderPlus,
  Code2,
  MonitorPlay,
  Sparkles,
  Github,
  Keyboard,
} from "lucide-react"

export interface DocNavItem {
  title: string
  href: string
  description: string
  icon: LucideIcon
}

export const docsNavItems: DocNavItem[] = [
  {
    title: "Introduction",
    href: "/docs",
    description: "What Xynraco is and what you can build with it",
    icon: BookOpen,
  },
  {
    title: "Signing In",
    href: "/docs/signing-in",
    description: "Log in with GitHub or Google",
    icon: LogIn,
  },
  {
    title: "Creating a Playground",
    href: "/docs/creating-a-playground",
    description: "Start a new project from a template",
    icon: FolderPlus,
  },
  {
    title: "Using the Editor",
    href: "/docs/using-the-editor",
    description: "Files, tabs, and saving your work",
    icon: Code2,
  },
  {
    title: "Preview Panel",
    href: "/docs/preview-panel",
    description: "See your app update live as you code",
    icon: MonitorPlay,
  },
  {
    title: "AI Code Suggestions",
    href: "/docs/ai-code-suggestions",
    description: "Let AI help you write code faster",
    icon: Sparkles,
  },
  {
    title: "GitHub Integration",
    href: "/docs/github-integration",
    description: "Connect your account and browse your repos",
    icon: Github,
  },
  {
    title: "Keyboard Shortcuts",
    href: "/docs/keyboard-shortcuts",
    description: "Work faster with shortcuts",
    icon: Keyboard,
  },
]

export function getAdjacentDocs(href: string): {
  prev: DocNavItem | null
  next: DocNavItem | null
} {
  const index = docsNavItems.findIndex((item) => item.href === href)
  if (index === -1) {
    return { prev: null, next: null }
  }
  return {
    prev: index > 0 ? docsNavItems[index - 1] : null,
    next: index < docsNavItems.length - 1 ? docsNavItems[index + 1] : null,
  }
}