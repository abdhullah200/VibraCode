import AddNewButton from "@/features/dashboard/components/add-new-button";
import AddRepo from "@/features/dashboard/components/add-repo";
import EmptyState from "@/components/ui/empty-state";
import React from "react";
import { getAllPlaygroundForUser } from "@/features/dashboard/action";
import DashboardWithTabs from "@/features/dashboard/components/dashboard-with-tabs";
import { ConnectedRepos } from "@/features/dashboard/components/connected-repos";
import { getConnectedRepositories } from "@/features/dashboard/action/github-actions";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  const { repositories } = await getConnectedRepositories();
  
  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 lg:py-10">
      <div className="w-full max-w-[1200px] flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full max-w-[1200px]">
        <AddNewButton />
        <AddRepo />
      </div>

      <div className="w-full max-w-[1200px] mt-4 sm:mt-6">
        <ConnectedRepos repositories={repositories || []} />
      </div>

      <div className="mt-5 sm:mt-7 lg:mt-10 flex flex-col justify-center items-center w-full max-w-[1200px]">
        {playgrounds && playgrounds.length === 0 ? (
          <EmptyState title="No projects found" description="Create a new project to get started!" imageSrc='/empty-state.svg'/>
        ) : (
          <DashboardWithTabs projects={playgrounds || []} />
        )}
      </div>
    </div>
  );
};

export default DashboardMainPage;