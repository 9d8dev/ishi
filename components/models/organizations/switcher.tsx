"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Building } from "lucide-react";

import { setActiveOrganization } from "@/lib/data/organization";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import type { Organization } from "better-auth/plugins/organization";

export const OrganizationSwitcher = ({
  organizations,
  activeOrganization,
  className,
}: {
  organizations: Organization[];
  activeOrganization: string;
  className?: string;
}) => {
  const { execute, isExecuting } = useAction(setActiveOrganization, {
    onSuccess: () => {
      toast.success("Organization set");
    },
    onError: () => {
      toast.error("Failed to set organization");
    },
  });

  return (
    <Select
      onValueChange={(value) => execute({ id: value })}
      value={activeOrganization}
    >
      <SelectTrigger
        size="sm"
        className={cn(
          isExecuting && "cursor-not-allowed",
          "border-0 shadow-none cursor-pointer",
          "px-2 grid grid-cols-[auto_1fr_auto]",
          className
        )}
        disabled={isExecuting}
      >
        <Building size={16} />
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
  );
};
