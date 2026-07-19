import type { Metadata } from "next"

// needs to be completed
import { ApiTester } from "@/features/api-test/components/api-tester" 

export const metadata: Metadata = {
  title: "API Tester | Xynraco",
  description: "Send real requests to the Xynraco API and inspect the response.",
}

export default function ApiTestPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:px-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">API Tester</h1>
        <p className="text-muted-foreground">
          Pick an endpoint, edit the params, headers, or body, and send a real request to your Xynraco
          deployment. Requests are sent with your current session, so signed-in-only endpoints work as
          expected.
        </p>
      </div>
      <ApiTester /> 
    </div>
  )
}
