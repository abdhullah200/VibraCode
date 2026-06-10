import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AlertTriangle, Github, Trash2 } from "lucide-react";
import React from "react";
import { revalidatePath } from "next/cache";

async function getGithubAccount(userId: string) {
  return db.account.findFirst({ where: { userId, provider: "github" } });
}

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    redirect("/auth/sign-in");
  }

  const githubAccount = await getGithubAccount(user.id);

  const renameUser = async (formData: FormData) => {
    "use server";
    const name = formData.get("name")?.toString().trim();
    if (!name) return;
    await db.user.update({ where: { id: user.id }, data: { name } });
    revalidatePath("/settings");
  };

  const disconnectGithub = async () => {
    "use server";
    await db.account.deleteMany({ where: { userId: user.id, provider: "github" } });
    revalidatePath("/settings");
  };

  const clearProjects = async () => {
    "use server";
    await db.playground.deleteMany({ where: { userId: user.id } });
    revalidatePath("/dashboard");
  };

  const deactivateAccount = async () => {
    "use server";
    // End session first, then delete only this user's data.
    await signOut({ redirect: false });

    await db.$transaction([
      db.playground.deleteMany({ where: { userId: user.id } }),
      db.account.deleteMany({ where: { userId: user.id } }),
      // Use deleteMany to avoid throwing if the user was already removed.
      db.user.deleteMany({ where: { id: user.id } }),
    ]);

    redirect("/auth/sign-in");
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden" />
            <div>
              <p className="text-sm text-muted-foreground">Profile & security</p>
              <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {githubAccount ? "GitHub linked" : "GitHub not linked"}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your basic account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{user.name ?? "Not set"}</p>
              </div>
              <Separator />
              <div className="text-sm">
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{user.email ?? "Not set"}</p>
              </div>
              <Separator />
              <div className="text-sm flex items-center gap-2">
                <Github className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">GitHub</p>
                  <p className="font-medium">
                      {githubAccount ? githubAccount.providerAccountId : "Not connected"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle>Rename user</CardTitle>
              <CardDescription>Update your display name</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={renameUser} className="space-y-3">
                <Input
                  name="name"
                  placeholder="Enter new display name"
                  defaultValue={user.name ?? ""}
                />
                <Button type="submit" className="w-full">
                  Save name
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle>Connected accounts</CardTitle>
            <CardDescription>Manage OAuth connections</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5" />
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-sm text-muted-foreground">
                  {githubAccount ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <form action={disconnectGithub}>
              <Button variant="outline" type="submit" disabled={!githubAccount}>
                Disconnect
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border border-destructive/40 bg-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Danger zone
            </CardTitle>
            <CardDescription>
              Irreversible actions for your workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-medium">Clear all projects</p>
                <p className="text-sm text-muted-foreground">
                  Remove every playground/project associated with your account.
                </p>
              </div>
              <form action={clearProjects}>
                <Button variant="outline" type="submit">
                  Clear projects
                </Button>
              </form>
            </div>

            <Separator />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-medium">Deactivate account</p>
                <p className="text-sm text-muted-foreground">
                  Delete your account and all associated data. This cannot be undone.
                </p>
              </div>
              <form action={deactivateAccount}>
                <Button variant="destructive" type="submit" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" /> Deactivate
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Tip: Export anything you need before clearing or deactivating.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
