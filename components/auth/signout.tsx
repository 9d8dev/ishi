"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth/actions"
import { useToast } from "@/lib/hooks/use-toast"
import { useAction } from "next-safe-action/hooks"

export function SignOut() {
  const { toast } = useToast()
  const { execute, isExecuting } = useAction(signOut, {
    onSuccess() {
      toast({
        title: "Success",
        description: "You have been successfully signed out",
      })
    },
    onError() {
      toast({
        title: "Error",
        description: "Failed to sign out.",
      })
    },
  })
  return (
    <Button disabled={isExecuting} onClick={() => execute()}>
      Sign Out
    </Button>
  )
}
