"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Code2,
  Compass,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  type LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
  Database,
  FlameIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import TemplateSelectionModal from "@/components/modal/template-selector-modal"
import { createPlayground } from "@/features/dashboard/action"
import { toast } from "sonner"

// Define the interface for a single playground item, icon is now a string
interface PlaygroundData {
  id: string
  name: string
  icon: string // Changed to string
  starred: boolean
}

// Map icon names (strings) to their corresponding LucideIcon components
const lucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2, // Include the default icon
  // Add any other icons you might use dynamically
}

// Starter template types
const STARTER_TEMPLATES = ["REACT", "NEXTJS", "EXPRESS", "VUE", "HONO", "ANGULAR"];
const API_TEST_ROUTE = "/api-test"

export function DashboardSidebar({ initialPlaygroundData }: { initialPlaygroundData: PlaygroundData[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const recentPlaygrounds = initialPlaygroundData.slice(0, 5) // Show last 5 recent items

  const getPlaygroundHref = (playground: PlaygroundData) => {
    if (playground.name === "API Prototype" || playground.id === "pg-1") {
      return API_TEST_ROUTE
    }

    return `/playground/${playground.id}`
  }

  const handleCreatePlayground = async (data: {
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  }) => {
    try {
      const result = await createPlayground({
        title: data.title,
        template: data.template,
        description: data.description,
        userId: ""
      });

      if (result) {
        toast.success("Playground created successfully!");
        setIsModalOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to create playground. Please try again.");
      }
    } catch (error) {
      console.error("Error creating playground:", error);
      toast.error("An error occurred while creating the playground.");
    }
  }

  return (
    <>
    <Sidebar variant="inset" collapsible="icon" className="border border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3 justify-center">
          <Image src={"/logo.png"} alt="logo" height={60} width={60} />
        </div>
       
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Home">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <History className="h-4 w-4 mr-2" />
            Recent
          </SidebarGroupLabel>
          <SidebarGroupAction title="Create new playground" onClick={() => setIsModalOpen(true)}>
            <FolderPlus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentPlaygrounds.length === 0 ? (
                <div className="text-center text-muted-foreground py-4 w-full px-2 text-sm">
                  Create your first playground
                </div>
              ) : (
                <>
                  {recentPlaygrounds.map((playground) => {
                    const IconComponent = lucideIconMap[playground.icon] || Code2;
                    const href = getPlaygroundHref(playground)
                    return (
                      <SidebarMenuItem key={playground.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === href}
                          tooltip={playground.name}
                        >
                          <Link href={href}>
                            {IconComponent && <IconComponent className="h-4 w-4" />}
                            <span>{playground.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="View all">
                      <Link href="/dashboard">
                        <span className="text-sm text-muted-foreground">View all playgrounds</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <TemplateSelectionModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      onSubmit={handleCreatePlayground}
    />
    </>
  )
}
export default DashboardSidebar