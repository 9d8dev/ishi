"use client"

import { Button } from "@/components/ui/button"
import { useAction } from "next-safe-action/hooks"
import { acceptInvitation } from "@/lib/data/organization"
import { toast } from "sonner"
import { parseActionError } from "@/lib/data/safe"

export function AcceptInvitation({ id }: { id: string }) {
  const { execute, isExecuting } = useAction(acceptInvitation, {
    onSuccess() {
      toast.success("Invitation accepted")
    },
    onError({ error }) {
      toast.error(parseActionError(error))
    },
  })

  return (
    <Button size="sm" onClick={() => execute({ id })} disabled={isExecuting}>
      Accept
    </Button>
  )
}
