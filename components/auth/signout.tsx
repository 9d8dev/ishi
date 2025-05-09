"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth/actions"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

export function SignOut() {
  const { execute, isExecuting } = useAction(signOut, {
    onSuccess() {
      toast.success("You have been successfully signed out")
    },
    onError() {
      toast.error("Failed to sign out.")
    },
  })
  return (
    <Button disabled={isExecuting} onClick={() => execute()}>
      Sign Out
    </Button>
  )
}
