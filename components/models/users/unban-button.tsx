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
import { Ban } from "lucide-react"
import { unbanUser } from "@/lib/data/user"
import { useAction } from "next-safe-action/hooks"
import { parseActionError } from "@/lib/data/safe"
import { toast } from "sonner"

export function UnbanUserButton({ id }: { id: string }) {
  const { execute, isExecuting } = useAction(unbanUser, {
    onSuccess() {
      toast.success("User unbanned successfully")
    },
    onError({ error }) {
      toast.error(parseActionError(error))
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm">
          <Ban className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unban user?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will unban the user from the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => execute({ id })}
            disabled={isExecuting}
          >
            {isExecuting ? "Unbanning..." : "Unban User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
