"use client"

import { Button } from "@/components/ui/button"
import { useAction } from "next-safe-action/hooks"
import { rejectInvitation } from "@/lib/data/organization"
import { toast } from "sonner"
import { parseActionError } from "@/lib/data/utils"

export function RejectInvitation({ id }: { id: string }) {
  const { execute, isExecuting } = useAction(rejectInvitation, {
    onSuccess() {
      toast.success("Invitation rejected")
    },
    onError({ error }) {
      toast.error(parseActionError(error))
    },
  })

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => execute({ id })}
      disabled={isExecuting}
    >
      Reject
    </Button>
  )
}
