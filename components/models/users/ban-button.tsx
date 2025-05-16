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
import { banUser } from "@/lib/data/user"
import { useAction } from "next-safe-action/hooks"
import { parseActionError } from "@/lib/data/safe"
import { toast } from "sonner"

export function BanUserButton({ id }: { id: string }) {
  const { execute, isExecuting } = useAction(banUser, {
    onSuccess() {
      toast.success("User banned successfully")
    },
    onError({ error }) {
      toast.error(parseActionError(error))
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Ban className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ban user?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will ban the user from the platform indefinitely.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => execute({ id })}
            disabled={isExecuting}
          >
            {isExecuting ? "Banning..." : "Ban User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
