"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Trash2, Lock, Globe, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { openRepositoryInEditor } from "../action/github-actions";

interface GitHubRepository {
  id: string;
  repoId: string;
  repoName: string;
  fullName: string;
  owner: string;
  description: string | null;
  url: string;
  defaultBranch: string;
  isPrivate: boolean;
  cloneUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ConnectedReposProps {
  repositories: GitHubRepository[];
}

export function ConnectedRepos({ repositories: initialRepos }: ConnectedReposProps) {
  const router = useRouter();
  const [repositories, setRepositories] = useState(initialRepos);
  const [repoToDelete, setRepoToDelete] = useState<GitHubRepository | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openingRepoId, setOpeningRepoId] = useState<string | null>(null);

  const handleOpenInEditor = async (repo: GitHubRepository) => {
    setOpeningRepoId(repo.repoId);
    try {
      const { playgroundId, error } = await openRepositoryInEditor(repo.repoId);

      if (error) {
        toast.error(error);
        return;
      }

      if (playgroundId) {
        toast.success(`Opening ${repo.repoName}...`);
        router.push(`/playground/${playgroundId}`);
      }
    } catch (error) {
      console.error("Error opening repository:", error);
      toast.error("Failed to open repository");
    } finally {
      setOpeningRepoId(null);
    }
  };

  const handleDisconnect = async () => {
    if (!repoToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/github/connect?repoId=${repoToDelete.repoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to disconnect repository");
      }

      setRepositories((prev) =>
        prev.filter((repo) => repo.repoId !== repoToDelete.repoId)
      );
      toast.success(`Disconnected ${repoToDelete.repoName} successfully`);
    } catch (error) {
      console.error("Error disconnecting repository:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to disconnect repository"
      );
    } finally {
      setIsDeleting(false);
      setRepoToDelete(null);
    }
  };

  if (repositories.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            Connected Repositories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="border rounded-lg p-4 hover:border-[#6b63ff] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm line-clamp-1">
                          {repo.repoName}
                        </h3>
                        {repo.isPrivate ? (
                          <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <Globe className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {repo.owner}
                      </p>
                    </div>
                  </div>

                  {repo.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleOpenInEditor(repo)}
                      disabled={openingRepoId === repo.repoId}
                    >
                      {openingRepoId === repo.repoId ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Opening...
                        </>
                      ) : (
                        "Open in Editor"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(repo.url, "_blank")}
                      title="View on GitHub"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRepoToDelete(repo)}
                      title="Disconnect"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!repoToDelete}
        onOpenChange={(open) => !open && setRepoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Repository?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disconnect{" "}
              <span className="font-semibold">{repoToDelete?.repoName}</span>?
              This will remove the connection but won't affect your GitHub
              repository.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisconnect}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Disconnecting..." : "Disconnect"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
