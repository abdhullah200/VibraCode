import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
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
        { error: "GitHub account not connected. Please sign in with GitHub." },
        { status: 400 }
      );
    }

    // Fetch repositories from GitHub API
    const response = await fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
      headers: {
        Authorization: `Bearer ${account.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch repositories from GitHub" },
        { status: response.status }
      );
    }

    const repositories = await response.json();

    return NextResponse.json({
      repositories,
      count: repositories.length,
    });
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
