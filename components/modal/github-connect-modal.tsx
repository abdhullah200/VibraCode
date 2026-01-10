"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Search, Star, Lock, Globe, GitFork, AlertCircle } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  default_branch: string;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GitHubConnectModal({
  open,
  onOpenChange,
}: GitHubConnectModalProps) {
  const { data: session } = useSession();
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [needsGitHubLink, setNeedsGitHubLink] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

  // Check if user has GitHub account linked
  const hasGitHubAccount = session?.user && 
    // Check if the account object exists in session (added by our callback)
    (session as any).provider === "github";

  const fetchRepositories = async () => {
    if (!session?.user) {
      toast.error("Please sign in to continue");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/github/repositories");
      const data = await response.json();

      console.log("Repositories response:", { status: response.status, data });

      if (!response.ok) {
        // If we get a 400 error about GitHub not being connected, show the link prompt
        if (response.status === 400) {
          console.log("GitHub not connected, showing link prompt");
          setNeedsGitHubLink(true);
          setRepositories([]);
          setFilteredRepos([]);
          setLoading(false);
          return;
        }
        throw new Error(data.error || "Failed to fetch repositories");
      }

      console.log("Got repositories:", data.repositories?.length);
      setRepositories(data.repositories || []);
      setFilteredRepos(data.repositories || []);
      setNeedsGitHubLink(false);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch repositories"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(query.toLowerCase()) ||
        repo.description?.toLowerCase().includes(query.toLowerCase()) ||
        repo.full_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRepos(filtered);
  };

  const handleConnect = async (repo: GitHubRepo) => {
    setConnecting(true);
    setSelectedRepo(repo);
    try {
      const response = await fetch("/api/github/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoId: repo.id.toString(),
          repoName: repo.name,
          fullName: repo.full_name,
          owner: repo.owner.login,
          description: repo.description,
          url: repo.html_url,
          defaultBranch: repo.default_branch,
          isPrivate: repo.private,
          cloneUrl: repo.clone_url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to connect repository");
      }

      toast.success(`Connected ${repo.name} successfully!`);
      onOpenChange(false);
    } catch (error) {
      console.error("Error connecting repository:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to connect repository"
      );
    } finally {
      setConnecting(false);
      setSelectedRepo(null);
    }
  };

  const handleLinkGitHub = async () => {
    setIsLinking(true);
    try {
      // Use the proper Next-Auth callback URL
      await signIn("github", {
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Error linking GitHub:", error);
      toast.error("Failed to link GitHub account");
      setIsLinking(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setNeedsGitHubLink(false);
      setRepositories([]);
      setFilteredRepos([]);
      fetchRepositories();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="w-6 h-6" />
            Connect GitHub Repository
          </DialogTitle>
          <DialogDescription>
            Select a repository from your GitHub account to work with in the editor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {needsGitHubLink ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 border rounded-lg bg-muted/50">
              <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Link GitHub Account</h3>
              <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
                To access your GitHub repositories, you need to link your GitHub account. 
                You'll only need to do this once.
              </p>
              <Button
                onClick={handleLinkGitHub}
                disabled={isLinking}
                size="lg"
                className="gap-2"
              >
                <Github className="w-5 h-5" />
                {isLinking ? "Linking..." : "Link GitHub Account"}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search repositories..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-9"
                    disabled={loading}
                  />
                </div>
                <Button
                  onClick={fetchRepositories}
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Refresh"}
                </Button>
              </div>

              <ScrollArea className="h-[400px] pr-4">
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : filteredRepos.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Github className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No repositories found</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      {repositories.length === 0
                        ? "We couldn't find any repositories in your GitHub account."
                        : "No repositories match your search query."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className="border rounded-lg p-4 hover:border-[#6b63ff] transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-base">
                                {repo.full_name}
                              </h3>
                              {repo.private ? (
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <Globe className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {repo.description || "No description available"}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork className="w-3 h-3" />
                                {repo.forks_count}
                              </span>
                              <span>•</span>
                              <span>{repo.default_branch}</span>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleConnect(repo)}
                            disabled={
                              connecting && selectedRepo?.id === repo.id
                            }
                            size="sm"
                            className="ml-4"
                          >
                            {connecting && selectedRepo?.id === repo.id
                              ? "Connecting..."
                              : "Connect"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
