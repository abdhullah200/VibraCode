import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const repoId = searchParams.get("repoId");
    const path = searchParams.get("path") || "";

    if (!repoId) {
      return NextResponse.json(
        { error: "Repository ID is required" },
        { status: 400 }
      );
    }

    // Get the connected repository
    const repo = await db.gitHubRepository.findUnique({
      where: {
        userId_repoId: {
          userId: session.user.id,
          repoId,
        },
      },
    });

    if (!repo) {
      return NextResponse.json(
        { error: "Repository not found" },
        { status: 404 }
      );
    }

    // Get the user's GitHub account
    const account = await db.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "github",
      },
    });

    if (!account || !account.accessToken) {
      return NextResponse.json(
        { error: "GitHub account not connected" },
        { status: 400 }
      );
    }

    // Fetch repository contents from GitHub API
    const apiUrl = `https://api.github.com/repos/${repo.fullName}/contents/${path}?ref=${repo.defaultBranch}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${account.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch repository contents from GitHub" },
        { status: response.status }
      );
    }

    const contents = await response.json();

    return NextResponse.json({
      contents,
      repository: {
        id: repo.id,
        name: repo.repoName,
        fullName: repo.fullName,
        defaultBranch: repo.defaultBranch,
      },
    });
  } catch (error) {
    console.error("Error fetching repository contents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
