"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { ResponseResult } from "@/features/api-test/lib/request-runner"

interface ResponseViewerProps {
  result: ResponseResult | null
  loading: boolean
}

function statusColor(status: number): string {
  if (status === 0) return "text-red-500 border-red-500/30 bg-red-500/10"
  if (status < 300) return "text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
  if (status < 400) return "text-blue-500 border-blue-500/30 bg-blue-500/10"
  if (status < 500) return "text-amber-500 border-amber-500/30 bg-amber-500/10"
  return "text-red-500 border-red-500/30 bg-red-500/10"
}

export function ResponseViewer({ result, loading }: ResponseViewerProps) {
  const [copied, setCopied] = useState(false)

  const copyBody = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.body)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy response:", err)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border text-sm text-muted-foreground">
        Sending request…
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border text-sm text-muted-foreground">
        Send a request to see the response here.
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={cn("font-mono text-xs", statusColor(result.status))}>
          {result.status || "ERR"} {result.statusText}
        </Badge>
        <span className="text-xs text-muted-foreground">{result.durationMs} ms</span>
        <span className="truncate text-xs text-muted-foreground">{result.requestUrl}</span>
      </div>

      {result.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{result.error}</p>
      )}

      {result.status === 401 && (
        <p className="rounded-md bg-amber-500/10 px-3 py-2 text-xs text-amber-600">
          401 Unauthorized — this endpoint requires a signed-in session. Sign in and try again.
        </p>
      )}

      <Tabs defaultValue="body" className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers ({Object.keys(result.headers).length})</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs" onClick={copyBody}>
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        <TabsContent value="body" className="mt-2 flex-1">
          <ScrollArea className="h-[320px] rounded-md border bg-[#1e1e1e]">
            <pre className="whitespace-pre-wrap break-all p-3 font-mono text-xs text-zinc-200">
              {result.body || "(empty response body)"}
            </pre>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="headers" className="mt-2 flex-1">
          <ScrollArea className="h-[320px] rounded-md border">
            <div className="flex flex-col divide-y">
              {Object.entries(result.headers).map(([key, value]) => (
                <div key={key} className="flex gap-3 px-3 py-2 text-xs">
                  <span className="w-40 shrink-0 font-mono font-medium">{key}</span>
                  <span className="min-w-0 flex-1 break-all font-mono text-muted-foreground">{value}</span>
                </div>
              ))}
              {Object.keys(result.headers).length === 0 && (
                <p className="px-3 py-2 text-xs text-muted-foreground">No headers returned.</p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
