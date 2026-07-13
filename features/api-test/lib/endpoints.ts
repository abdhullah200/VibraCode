export type HttpMethod = "GET" | "POST" | "DELETE"
export type ParamLocation = "query" | "body" | "path"

export interface EndpointParam {
  name: string
  location: ParamLocation
  required: boolean
  placeholder?: string
}

export interface TestableEndpoint {
  id: string
  method: HttpMethod
  path: string // may contain {param} placeholders
  label: string
  group: string
  auth: boolean
  params?: EndpointParam[]
  sampleBody?: string // pretty-printed JSON string used to prefill the body editor
}

export const testableEndpoints: TestableEndpoint[] = [
  {
    id: "chat-send",
    method: "POST",
    path: "/api/chat",
    label: "Send chat message",
    group: "AI Chat",
    auth: false,
    sampleBody: `{
  "message": "How do I center a div with flexbox?",
  "history": []
}`,
  },
  {
    id: "chat-enhance",
    method: "POST",
    path: "/api/chat",
    label: "Enhance prompt",
    group: "AI Chat",
    auth: false,
    sampleBody: `{
  "action": "enhance",
  "prompt": "fix my code"
}`,
  },
  {
    id: "chat-health",
    method: "GET",
    path: "/api/chat",
    label: "Chat health check",
    group: "AI Chat",
    auth: false,
  },
  {
    id: "code-suggestion",
    method: "POST",
    path: "/api/code-suggestion",
    label: "Get code suggestion",
    group: "Code Suggestions",
    auth: false,
    sampleBody: `{
  "fileContent": "function add(a, b) {\\n  \\n}",
  "cursorLine": 1,
  "cursorColumn": 2,
  "suggestionType": "completion",
  "fileName": "math.ts"
}`,
  },
  {
    id: "github-connect-get",
    method: "GET",
    path: "/api/github/connect",
    label: "List connected repositories",
    group: "GitHub Integration",
    auth: true,
  },
  {
    id: "github-connect-post",
    method: "POST",
    path: "/api/github/connect",
    label: "Connect a repository",
    group: "GitHub Integration",
    auth: true,
    sampleBody: `{
  "repoId": "123456",
  "repoName": "xynraco",
  "fullName": "abdhullah200/Xynraco",
  "owner": "abdhullah200",
  "url": "https://github.com/abdhullah200/Xynraco",
  "cloneUrl": "https://github.com/abdhullah200/Xynraco.git"
}`,
  },
  {
    id: "github-connect-delete",
    method: "DELETE",
    path: "/api/github/connect",
    label: "Disconnect a repository",
    group: "GitHub Integration",
    auth: true,
    params: [{ name: "repoId", location: "query", required: true, placeholder: "123456" }],
  },
  {
    id: "github-repositories",
    method: "GET",
    path: "/api/github/repositories",
    label: "List GitHub repositories",
    group: "GitHub Integration",
    auth: true,
  },
  {
    id: "github-repo-contents",
    method: "GET",
    path: "/api/github/repo-contents",
    label: "Get repository contents",
    group: "GitHub Integration",
    auth: true,
    params: [
      { name: "repoId", location: "query", required: true, placeholder: "123456" },
      { name: "path", location: "query", required: false, placeholder: "src" },
    ],
  },
  {
    id: "github-repo-tree",
    method: "GET",
    path: "/api/github/repo-tree",
    label: "Get full repository tree",
    group: "GitHub Integration",
    auth: true,
    params: [{ name: "repoId", location: "query", required: true, placeholder: "123456" }],
  },
  {
    id: "template-load",
    method: "GET",
    path: "/api/template/{id}",
    label: "Load playground template",
    group: "Template Loader",
    auth: false,
    params: [{ name: "id", location: "path", required: true, placeholder: "playground_id" }],
  },
]

export function groupEndpoints(): Record<string, TestableEndpoint[]> {
  return testableEndpoints.reduce<Record<string, TestableEndpoint[]>>((acc, endpoint) => {
    acc[endpoint.group] = acc[endpoint.group] ?? []
    acc[endpoint.group].push(endpoint)
    return acc
  }, {})
}
