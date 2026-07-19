import AddNewButton from "@/features/dashboard/components/add-new-button";
import AddRepo from "@/features/dashboard/components/add-repo";
import EmptyState from "@/components/ui/empty-state";
import React from "react";
import { getAllPlaygroundForUser } from "@/features/dashboard/action";
import DashboardWithTabs from "@/features/dashboard/components/dashboard-with-tabs";
import { ConnectedRepos } from "@/features/dashboard/components/connected-repos";
import { getConnectedRepositories } from "@/features/dashboard/action/github-actions";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { ChevronRight, FlaskConical } from "lucide-react";

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  const { repositories } = await getConnectedRepositories();
  
  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 lg:py-10">
      <div className="w-full max-w-300 flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full max-w-300">
        <AddNewButton />
        <AddRepo />
      </div>

      <div className="w-full max-w-300 mt-3 sm:mt-4">
        <Link
          href="/api-test"
          className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-linear-to-r from-zinc-950 via-zinc-900 to-slate-900 px-5 py-4 text-left shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_16px_40px_rgba(16,185,129,0.12)]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-105">
              <FlaskConical className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-white">API Tester</h2>
                <span className="rounded-full border border-emerald-500/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                  New
                </span>
              </div>
              <p className="text-sm text-zinc-400">Open the new API test workspace from the dashboard.</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-300" />
        </Link>
      </div>

      <div className="w-full max-w-300 mt-4 sm:mt-6">
        <ConnectedRepos repositories={repositories || []} />
      </div>

      <div className="mt-5 sm:mt-7 lg:mt-10 flex flex-col justify-center items-center w-full max-w-300">
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