import AddNewButton from "@/features/dashboard/components/add-new-button";
import AddRepo from "@/features/dashboard/components/add-repo";

import ClientProjectTable from "@/features/dashboard/components/client-project-table";
import { getAllPlaygroundForUser } from "@/features/playground/actions";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <img src="/empty-state.png" alt="No projects" className="w-48 h-48 mb-4" />
    <h2 className="text-xl font-semibold text-gray-500">No projects found</h2>
    <p className="text-gray-400">Create a new project to get started!</p>
  </div>
);

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  console.log(playgrounds);
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {playgrounds && playgrounds.length === 0 ? (
          <EmptyState />
        ) : (
          <ClientProjectTable 
            projects={playgrounds.map(playground => ({
              id: playground.id,
              title: playground.title,
              description: "",
              template: playground.template || "",
              createdAt: new Date(),
              updatedAt: new Date(),
              userId: "mock-user-id",
              user: {
                id: "mock-user-id",
                name: "Mock User",
                email: "user@example.com", 
                image: "",
                role: "user",
                createdAt: new Date(),
                updatedAt: new Date()
              },
              Starmark: playground.Starmark?.map(mark => ({ isMarked: mark.isMarked ?? false })) || []
            }))}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardMainPage;