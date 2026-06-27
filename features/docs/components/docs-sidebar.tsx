"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookText } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { docsNavItems } from "@/features/docs/lib/nav-items"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="offcanvas" className="border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <BookText className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold">Xynraco Docs</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User Guide</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {docsNavItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button asChild variant="outline" size="sm" className="w-full justify-start">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}