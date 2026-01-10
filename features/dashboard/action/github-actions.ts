"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getConnectedRepositories() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized", repositories: [] };
    }

    const repositories = await db.gitHubRepository.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return { repositories, error: null };
  } catch (error) {
    console.error("Error fetching connected repositories:", error);
    return { error: "Failed to fetch repositories", repositories: [] };
  }
}

export async function disconnectRepository(repoId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized", success: false };
    }

    await db.gitHubRepository.delete({
      where: {
        userId_repoId: {
          userId: session.user.id,
          repoId,
        },
      },
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Error disconnecting repository:", error);
    return { error: "Failed to disconnect repository", success: false };
  }
}

export async function getRepositoryById(repoId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized", repository: null };
    }

    const repository = await db.gitHubRepository.findUnique({
      where: {
        userId_repoId: {
          userId: session.user.id,
          repoId,
        },
      },
    });

    return { repository, error: null };
  } catch (error) {
    console.error("Error fetching repository:", error);
    return { error: "Failed to fetch repository", repository: null };
  }
}

export async function openRepositoryInEditor(repoId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized", playgroundId: null };
    }

    // Get the repository
    const repo = await db.gitHubRepository.findUnique({
      where: {
        userId_repoId: {
          userId: session.user.id,
          repoId,
        },
      },
    });

    if (!repo) {
      return { error: "Repository not found", playgroundId: null };
    }

    // Check if a playground already exists for this repo
    const existingPlayground = await db.playground.findFirst({
      where: {
        userId: session.user.id,
        title: repo.repoName,
      },
    });

    if (existingPlayground) {
      // Redirect to existing playground
      return { playgroundId: existingPlayground.id, error: null };
    }

    // Determine template based on repo name or default to REACT
    let template: any = "REACT";
    const repoNameLower = repo.repoName.toLowerCase();
    
    if (repoNameLower.includes("next")) template = "NEXTJS";
    else if (repoNameLower.includes("vue")) template = "VUE";
    else if (repoNameLower.includes("angular")) template = "ANGULAR";
    else if (repoNameLower.includes("express")) template = "EXPRESS";
    else if (repoNameLower.includes("flask")) template = "FLASK";
    else if (repoNameLower.includes("node")) template = "NODE";
    else if (repoNameLower.includes("vite")) template = "VITE";

    // Create a new playground for this repo
    const playground = await db.playground.create({
      data: {
        title: repo.repoName,
        description: repo.description || `Imported from ${repo.fullName}`,
        template: template,
        userId: session.user.id,
        templateFiles: {
          create: {
            content: {
              repoId: repo.repoId,
              fullName: repo.fullName,
              cloneUrl: repo.cloneUrl,
              defaultBranch: repo.defaultBranch,
              isGitHubRepo: true,
            },
          },
        },
      },
    });

    return { playgroundId: playground.id, error: null };
  } catch (error) {
    console.error("Error opening repository in editor:", error);
    return { error: "Failed to open repository", playgroundId: null };
  }
}
