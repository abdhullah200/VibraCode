import UserButton from "@/features/auth/components/user-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 bg-background p-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Hello, Next.js!</h1>
      <UserButton />
    </main>
  );
}
