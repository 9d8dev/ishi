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
import { UserRoundX } from "lucide-react"
import { demoteUser } from "@/lib/data/user"
import { useAction } from "next-safe-action/hooks"
import { parseActionError } from "@/lib/data/safe"
import { toast } from "sonner"

export function DemoteUserButton({ id }: { id: string }) {
  const { execute, isExecuting } = useAction(demoteUser, {
    onSuccess() {
      toast.success("User demoted successfully")
    },
    onError({ error }) {
      toast.error(parseActionError(error))
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="sm">
          <UserRoundX className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Demote user?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will demote the user to a regular user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => execute({ id })}
            disabled={isExecuting}
          >
            {isExecuting ? "Demoting..." : "Demote User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
