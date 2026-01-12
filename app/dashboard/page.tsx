import AddNewButton from "@/features/dashboard/components/add-new-button";
import AddRepo from "@/features/dashboard/components/add-repo";
import EmptyState from "@/components/ui/empty-state";
import React from "react";
import { getAllPlaygroundForUser } from "@/features/dashboard/action";
import DashboardWithTabs from "@/features/dashboard/components/dashboard-with-tabs";
import { ConnectedRepos } from "@/features/dashboard/components/connected-repos";
import { getConnectedRepositories } from "@/features/dashboard/action/github-actions";

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  const { repositories } = await getConnectedRepositories();
  
  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full max-w-[1400px]">
        <AddNewButton />
        <AddRepo />
      </div>
      
      <div className="w-full max-w-[1400px]">
        <ConnectedRepos repositories={repositories || []} />
      </div>
      
      <div className="mt-4 sm:mt-6 lg:mt-10 flex flex-col justify-center items-center w-full max-w-[1400px]">
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