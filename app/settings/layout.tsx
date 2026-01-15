import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { getAllPlaygroundForUser } from "@/features/playground/actions";
import type React from "react";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgroundData = await getAllPlaygroundForUser();

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  };

  const formattedPlaygroundData =
    playgroundData?.map((item) => ({
      id: item.id,
      name: item.title,
      starred: item.Starmark?.[0]?.isMarked || false,
      icon: (item.template && technologyIconMap[item.template]) || "Code2",
    })) || [];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar initialPlaygroundData={formattedPlaygroundData} />
        <main className="flex-1 overflow-x-auto min-w-0">{children}</main>
      </div>
    </SidebarProvider>
  );
}
