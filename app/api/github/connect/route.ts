import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      repoId,
      repoName,
      fullName,
      owner,
      description,
      url,
      defaultBranch,
      isPrivate,
      cloneUrl,
    } = body;

    // Validate required fields
    if (!repoId || !repoName || !fullName || !owner || !url || !cloneUrl) {
      return NextResponse.json(
        { error: "Missing required repository information" },
        { status: 400 }
      );
    }

    // Check if repository is already connected
    const existingRepo = await db.gitHubRepository.findUnique({
      where: {
        userId_repoId: {
          userId: session.user.id,
          repoId: repoId,
        },
      },
    });

    if (existingRepo) {
      return NextResponse.json(
        { error: "Repository already connected", repository: existingRepo },
        { status: 409 }
      );
    }

    // Create the repository connection
    const repository = await db.gitHubRepository.create({
      data: {
        userId: session.user.id,
        repoId,
        repoName,
        fullName,
        owner,
        description: description || null,
        url,
        defaultBranch: defaultBranch || "main",
        isPrivate: isPrivate || false,
        cloneUrl,
      },
    });

    return NextResponse.json({
      message: "Repository connected successfully",
      repository,
    });
  } catch (error) {
    console.error("Error connecting repository:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all connected repositories for the user
    const repositories = await db.gitHubRepository.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({
      repositories,
      count: repositories.length,
    });
  } catch (error) {
    console.error("Error fetching connected repositories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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

    if (!repoId) {
      return NextResponse.json(
        { error: "Repository ID is required" },
        { status: 400 }
      );
    }

    // Delete the repository connection
    await db.gitHubRepository.delete({
      where: {
        userId_repoId: {
          userId: session.user.id,
          repoId,
        },
      },
    });

    return NextResponse.json({
      message: "Repository disconnected successfully",
    });
  } catch (error) {
    console.error("Error disconnecting repository:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
