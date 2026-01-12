"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientProjectTable from "./client-project-table";
import type { Project } from "../types";
import EmptyState from "@/components/ui/empty-state";

interface DashboardWithTabsProps {
  projects: Project[];
}

// List of starter templates - these are the default templates users can start with
const STARTER_TEMPLATES = ["REACT", "NEXTJS", "EXPRESS", "VUE", "HONO", "ANGULAR"];

export default function DashboardWithTabs({ projects }: DashboardWithTabsProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Filter projects based on active tab
  const filteredProjects = () => {
    switch (activeTab) {
      case "starred":
        return projects.filter(project => project.Starmark[0]?.isMarked);
      case "starters":
        // Show only projects created from starter templates (you can customize this logic)
        return projects.filter(project => 
          STARTER_TEMPLATES.includes(project.template) && 
          project.description?.toLowerCase().includes("starter")
        );
      default:
        return projects;
    }
  };

  const filteredList = filteredProjects();

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Projects</h2>
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          {projects.length === 0 ? (
            <EmptyState
              title="No projects found"
              description="Create a new project to get started!"
              imageSrc="/empty-state.svg"
            />
          ) : (
            <ClientProjectTable projects={projects} />
          )}
        </TabsContent>

        <TabsContent value="starred" className="mt-0">
          {filteredList.length === 0 ? (
            <EmptyState
              title="No starred projects"
              description="Star your favorite projects to see them here!"
              imageSrc="/empty-state.svg"
            />
          ) : (
            <ClientProjectTable projects={filteredList} />
          )}
        </TabsContent>

        <TabsContent value="starters" className="mt-0">
          {filteredList.length === 0 ? (
            <EmptyState
              title="No starter playgrounds"
              description="Create a playground from a starter template to see it here!"
              imageSrc="/empty-state.svg"
            />
          ) : (
            <ClientProjectTable projects={filteredList} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
