"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Organization } from "better-auth/plugins/organization"
import { setActiveOrganization } from "@/lib/data/organization"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

export const OrganizationSwitcher = ({
  organizations,
  activeOrganization,
}: {
  organizations: Organization[]
  activeOrganization: string
}) => {
  const { execute, isExecuting } = useAction(setActiveOrganization, {
    onSuccess: () => {
      toast.success("Organization set")
    },
    onError: () => {
      toast.error("Failed to set organization")
    },
  })

  return (
    <Select
      onValueChange={(value) => execute({ id: value })}
      value={activeOrganization}
    >
      <SelectTrigger className="w-[180px]" disabled={isExecuting}>
        <SelectValue placeholder="Select Organization" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((org) => (
          <SelectItem key={org.id} value={org.id}>
            {org.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
