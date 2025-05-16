"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { revokeSessions } from "@/lib/data/user"
import { useAction } from "next-safe-action/hooks"
import { parseActionError } from "@/lib/data/safe"
import { toast } from "sonner"

export function RevokeSessionsButton({ id }: { id: string }) {
  const { execute, isExecuting } = useAction(revokeSessions, {
    onSuccess() {
      toast.success("User sessions revoked successfully")
    },
    onError({ error }) {
      toast.error(parseActionError(error))
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm">
          <LogOut className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke user sessions?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will revoke all sessions for the user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => execute({ id })}
            disabled={isExecuting}
          >
            {isExecuting ? "Revoking..." : "Revoke Sessions"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
