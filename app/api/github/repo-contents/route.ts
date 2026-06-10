import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

/**
 * Strict allowlists for GitHub-compatible values
 */
const REPO_FULLNAME_REGEX = /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/;
const REF_REGEX = /^[a-zA-Z0-9_.\/-]+$/;
const PATH_REGEX = /^[a-zA-Z0-9_./-]*$/;

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const repoId = searchParams.get("repoId");
    const rawPath = searchParams.get("path") || "";

    if (!repoId) {
      return NextResponse.json(
        { error: "Repository ID is required" },
        { status: 400 }
      );
    }

    // Normalize path
    const path = decodeURIComponent(rawPath).replace(/^\/+/, "");

    if (!PATH_REGEX.test(path) || path.includes("..")) {
      return NextResponse.json(
        { error: "Invalid path" },
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

    // Validate repo fields from DB (defense-in-depth)
    if (
      !REPO_FULLNAME_REGEX.test(repo.fullName) ||
      !REF_REGEX.test(repo.defaultBranch)
    ) {
      console.error("Invalid repository metadata", repo);
      return NextResponse.json(
        { error: "Invalid repository configuration" },
        { status: 500 }
      );
    }

    // Get the user's GitHub account
    const account = await db.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "github",
      },
    });

    if (!account?.access_token) {
      return NextResponse.json(
        { error: "GitHub account not connected" },
        { status: 400 }
      );
    }

    /**
     * SAFE URL CONSTRUCTION
     */
    const url = new URL(
      `/repos/${repo.fullName}/contents/${path}`,
      "https://api.github.com"
    );

    url.searchParams.set("ref", repo.defaultBranch);

    // Final host check (paranoid, but silences scanners)
    if (url.hostname !== "api.github.com") {
      return NextResponse.json(
        { error: "Invalid request target" },
        { status: 400 }
      );
    }

    const response = await fetch(url.toString(), {
      redirect: "error", // Prevent redirect-based SSRF
      headers: {
        Authorization: `Bearer ${account.access_token}`,
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
