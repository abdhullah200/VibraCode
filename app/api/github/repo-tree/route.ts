import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url?: string;
  size?: number;
}

async function fetchDirectoryContents(
  fullName: string,
  path: string,
  branch: string,
  accessToken: string
): Promise<GitHubFile[]> {
  const apiUrl = `https://api.github.com/repos/${fullName}/contents/${path}?ref=${branch}`;
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch contents for ${path}`);
  }

  return await response.json();
}

async function buildFileTree(
  fullName: string,
  path: string,
  branch: string,
  accessToken: string,
  maxDepth: number = 3,
  currentDepth: number = 0
): Promise<any> {
  if (currentDepth >= maxDepth) {
    return null;
  }

  const contents = await fetchDirectoryContents(fullName, path, branch, accessToken);
  const items = [];

  for (const item of contents) {
    if (item.type === "dir") {
      // Recursively fetch directory contents
      const subItems = await buildFileTree(
        fullName,
        item.path,
        branch,
        accessToken,
        maxDepth,
        currentDepth + 1
      );

      items.push({
        type: "folder",
        folderName: item.name,
        items: subItems || [],
      });
    } else if (item.type === "file") {
      // Fetch file content
      let content = "";
      if (item.download_url) {
        try {
          const fileResponse = await fetch(item.download_url);
          if (fileResponse.ok) {
            content = await fileResponse.text();
          }
        } catch (error) {
          console.error(`Failed to fetch content for ${item.path}:`, error);
        }
      }

      // Extract file name and extension
      const nameParts = item.name.split('.');
      const extension = nameParts.length > 1 ? nameParts.pop() || '' : '';
      const fileName = nameParts.join('.');

      items.push({
        type: "file",
        filename: fileName,
        fileExtension: extension,
        filePath: item.path,
        content,
      });
    }
  }

  return items;
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const repoId = searchParams.get("repoId");

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

    if (!account || !account.access_token) {
      return NextResponse.json(
        { error: "GitHub account not connected" },
        { status: 400 }
      );
    }

    // Build the file tree
    const items = await buildFileTree(
      repo.fullName,
      "",
      repo.defaultBranch,
      account.access_token
    );

    const templateData = {
      folderName: repo.repoName,
      items,
    };

    return NextResponse.json({
      templateData,
      repository: {
        id: repo.id,
        name: repo.repoName,
        fullName: repo.fullName,
        defaultBranch: repo.defaultBranch,
      },
    });
  } catch (error) {
    console.error("Error fetching repository tree:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
