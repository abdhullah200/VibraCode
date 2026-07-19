"use client"

import { useMemo, useState } from "react"
import { Loader2, Send } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BodyEditor } from "@/features/api-test/components/body-editor"
import { EndpointPicker } from "@/features/api-test/components/endpoint-picker"
import { HistoryPanel, type HistoryEntry } from "@/features/api-test/components/history-panel"
import { KeyValueEditor } from "@/features/api-test/components/key-value-editor"
import { ResponseViewer } from "@/features/api-test/components/response-viewer"
import { testableEndpoints, type HttpMethod } from "@/features/api-test/lib/endpoints"
import { sendRequest, type KeyValue, type ResponseResult } from "@/features/api-test/lib/request-runner"

const methodStyles: Record<HttpMethod, string> = {
  GET: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
  POST: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  DELETE: "text-red-500 border-red-500/30 bg-red-500/10",
}

function buildInitialState(endpointId: string) {
  const endpoint = testableEndpoints.find((e) => e.id === endpointId) ?? testableEndpoints[0]
  const pathParams: KeyValue[] = (endpoint.params ?? [])
    .filter((p) => p.location === "path")
    .map((p) => ({ key: p.name, value: p.placeholder ?? "" }))
  const queryParams: KeyValue[] = (endpoint.params ?? [])
    .filter((p) => p.location === "query")
    .map((p) => ({ key: p.name, value: p.placeholder ?? "" }))

  return {
    endpoint,
    pathParams,
    queryParams,
    headers: [] as KeyValue[],
    body: endpoint.sampleBody ?? "",
  }
}

export function ApiTester() {
  const [state, setState] = useState(() => buildInitialState(testableEndpoints[0].id))
  const [result, setResult] = useState<ResponseResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const lockedPathKeys = useMemo(
    () => (state.endpoint.params ?? []).filter((p) => p.location === "path").map((p) => p.name),
    [state.endpoint],
  )
  const lockedQueryKeys = useMemo(
    () =>
      (state.endpoint.params ?? [])
        .filter((p) => p.location === "query" && p.required)
        .map((p) => p.name),
    [state.endpoint],
  )

  const bodyDisabled = state.endpoint.method === "GET" || state.endpoint.method === "DELETE"

  const selectEndpoint = (id: string) => {
    setState(buildInitialState(id))
    setResult(null)
  }

  const handleSend = async () => {
    setLoading(true)
    try {
      const response = await sendRequest({
        method: state.endpoint.method,
        path: state.endpoint.path,
        pathParams: state.pathParams,
        queryParams: state.queryParams,
        headers: state.headers,
        body: state.body,
      })
      setResult(response)
      setHistory((prev) => [
        {
          id: `${Date.now()}`,
          method: state.endpoint.method,
          url: response.requestUrl,
          status: response.status,
          durationMs: response.durationMs,
          timestamp: response.timestamp,
        },
        ...prev,
      ].slice(0, 20))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-5">
        <EndpointPicker selectedId={state.endpoint.id} onSelect={selectEndpoint} />

        <Card>
          <CardContent className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("w-16 justify-center font-mono text-xs", methodStyles[state.endpoint.method])}>
                {state.endpoint.method}
              </Badge>
              <code className="min-w-0 flex-1 truncate font-mono text-sm">{state.endpoint.path}</code>
            </div>
          </CardContent>
        </Card>

        {state.pathParams.length > 0 && (
          <KeyValueEditor
            title="Path parameters"
            rows={state.pathParams}
            onChange={(rows) => setState((s) => ({ ...s, pathParams: rows }))}
            lockedKeys={lockedPathKeys}
          />
        )}

        <KeyValueEditor
          title="Query parameters"
          rows={state.queryParams}
          onChange={(rows) => setState((s) => ({ ...s, queryParams: rows }))}
          lockedKeys={lockedQueryKeys}
        />

        <KeyValueEditor
          title="Headers"
          rows={state.headers}
          onChange={(rows) => setState((s) => ({ ...s, headers: rows }))}
          keyPlaceholder="Header-Name"
        />

        <BodyEditor
          value={state.body}
          onChange={(body) => setState((s) => ({ ...s, body }))}
          disabled={bodyDisabled}
        />

        <Button onClick={handleSend} disabled={loading} className="gap-2 self-start">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send request
        </Button>

        <HistoryPanel
          entries={history}
          onClear={() => setHistory([])}
          onSelect={(entry) => {
            const match = testableEndpoints.find((e) => e.method === entry.method && entry.url.includes(e.path.split("{")[0]))
            if (match) selectEndpoint(match.id)
          }}
        />
      </div>

      <div className="lg:sticky lg:top-20 lg:self-start">
        <ResponseViewer result={result} loading={loading} />
      </div>
    </div>
  )
}
