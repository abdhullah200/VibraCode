export interface KeyValue {
  key: string
  value: string
}

export interface SendRequestInput {
  method: string
  path: string // may contain {param} placeholders
  pathParams: KeyValue[]
  queryParams: KeyValue[]
  headers: KeyValue[]
  body?: string
}

export interface ResponseResult {
  ok: boolean
  status: number
  statusText: string
  headers: Record<string, string>
  body: string
  durationMs: number
  timestamp: string
  requestUrl: string
  error?: string
}

export function buildUrl(path: string, pathParams: KeyValue[], queryParams: KeyValue[]): string {
  let resolvedPath = path
  for (const { key, value } of pathParams) {
    if (!key) continue
    resolvedPath = resolvedPath.replace(`{${key}}`, encodeURIComponent(value))
  }

  const url = new URL(resolvedPath, window.location.origin)
  for (const { key, value } of queryParams) {
    if (!key) continue
    url.searchParams.set(key, value)
  }

  return url.toString()
}

export async function sendRequest(input: SendRequestInput): Promise<ResponseResult> {
  const requestUrl = buildUrl(input.path, input.pathParams, input.queryParams)

  const headers: Record<string, string> = {}
  for (const { key, value } of input.headers) {
    if (key) headers[key] = value
  }

  const hasBody = input.method !== "GET" && input.method !== "DELETE" && input.body?.trim()
  if (hasBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json"
  }

  const startedAt = performance.now()
  const timestamp = new Date().toISOString()

  try {
    const response = await fetch(requestUrl, {
      method: input.method,
      headers,
      body: hasBody ? input.body : undefined,
      credentials: "same-origin",
    })

    const durationMs = Math.round(performance.now() - startedAt)
    const responseHeaders: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    const rawText = await response.text()
    let body = rawText
    try {
      body = JSON.stringify(JSON.parse(rawText), null, 2)
    } catch {
      // not JSON, leave as raw text
    }

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body,
      durationMs,
      timestamp,
      requestUrl,
    }
  } catch (error) {
    const durationMs = Math.round(performance.now() - startedAt)
    return {
      ok: false,
      status: 0,
      statusText: "Network Error",
      headers: {},
      body: "",
      durationMs,
      timestamp,
      requestUrl,
      error: error instanceof Error ? error.message : "Unknown network error",
    }
  }
}
