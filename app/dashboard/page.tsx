import AddNewButton from "@/features/dashboard/components/add-new-button";
import AddRepo from "@/features/dashboard/components/add-repo";
import EmptyState from "@/components/ui/empty-state";
import React from "react";
import { getAllPlaygroundForUser } from "@/features/dashboard/action";
import ClientProjectTable from "@/features/dashboard/components/client-project-table";
import { ConnectedRepos } from "@/features/dashboard/components/connected-repos";
import { getConnectedRepositories } from "@/features/dashboard/action/github-actions";

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  const { repositories } = await getConnectedRepositories();
  
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>
      
      <ConnectedRepos repositories={repositories || []} />
      
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {playgrounds && playgrounds.length === 0 ? (
          
          <EmptyState title="No projects found" description="Create a new project to get started!" imageSrc='/empty-state.svg'/>
        ) : (
          <ClientProjectTable
          //@ts-ignore
            projects={playgrounds||[]}
        />
        )
}
      </div>
    </div>
  );
};

export default DashboardMainPage;