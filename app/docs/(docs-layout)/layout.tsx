import type { Metadata } from "next"
import type { ReactNode } from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DocsSidebar } from "@/features/docs/components/docs-sidebar"
import { DocsTopbar } from "@/features/docs/components/docs-topbar"

export const metadata: Metadata = {
  title: {
    template: "%s | Xynraco Docs",
    default: "Xynraco Docs",
  },
  description: "Learn how to use the Xynraco browser-based IDE.",
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <DocsSidebar />
      <SidebarInset>
        <DocsTopbar />
        <div className="flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}