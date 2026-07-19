"use client"

import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { groupEndpoints, testableEndpoints, type HttpMethod } from "@/features/api-test/lib/endpoints"

interface EndpointPickerProps {
  selectedId: string
  onSelect: (id: string) => void
}

const methodStyles: Record<HttpMethod, string> = {
  GET: "text-emerald-500",
  POST: "text-blue-500",
  DELETE: "text-red-500",
}

export function EndpointPicker({ selectedId, onSelect }: EndpointPickerProps) {
  const grouped = groupEndpoints()
  const selected = testableEndpoints.find((endpoint) => endpoint.id === selectedId)

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">Endpoint</label>
      <Select value={selectedId} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an endpoint" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(grouped).map(([group, endpoints]) => (
            <SelectGroup key={group}>
              <SelectLabel>{group}</SelectLabel>
              {endpoints.map((endpoint) => (
                <SelectItem key={endpoint.id} value={endpoint.id}>
                  <span className={cn("font-mono text-xs font-semibold", methodStyles[endpoint.method])}>
                    {endpoint.method}
                  </span>{" "}
                  {endpoint.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      {selected?.auth && (
        <Badge variant="secondary" className="w-fit text-[10px]">
          Requires a signed-in session
        </Badge>
      )}
    </div>
  )
}
