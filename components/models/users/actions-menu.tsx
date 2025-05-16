"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import type { User } from "@/lib/db"
import { Ellipsis } from "lucide-react"
import {
  banUser,
  deleteUser,
  demoteUser,
  impersonateUser,
  promoteUser,
  revokeSessions,
  unbanUser,
} from "@/lib/data/user"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { parseActionError } from "@/lib/data/safe"

type ActionStates = {
  [K in (typeof actions)[number]["label"]]: {
    execute: (input: { id: string }) => void | Promise<void>
    isExecuting: boolean
  }
}

const actions = [
  {
    label: "Ban",
    action: banUser,
    title: "Ban user?",
    description:
      "This action will ban the user from the platform indefinitely.",
    buttonLabel: "Ban User",
    executingLabel: "Banning...",
    successLabel: "User banned successfully",
  },
  {
    label: "Unban",
    action: unbanUser,
    title: "Unban user?",
    description: "This action will unban the user from the platform.",
    buttonLabel: "Unban User",
    executingLabel: "Unbanning...",
    successLabel: "User unbanned successfully",
  },
  {
    label: "Impersonate",
    action: impersonateUser,
    title: "Impersonate user?",
    description: "This action will impersonate the user.",
    buttonLabel: "Impersonate User",
    executingLabel: "Impersonating...",
    successLabel: "Impersonated successfully",
  },
  {
    label: "Revoke Sessions",
    action: revokeSessions,
    title: "Revoke sessions?",
    description: "This action will revoke all sessions for the user.",
    buttonLabel: "Revoke Sessions",
    executingLabel: "Revoking sessions...",
    successLabel: "Sessions revoked successfully",
  },
  {
    label: "Promote",
    action: promoteUser,
    title: "Promote user?",
    description: "This action will promote the user to admin.",
    buttonLabel: "Promote User",
    executingLabel: "Promoting...",
    successLabel: "User promoted successfully",
  },
  {
    label: "Demote",
    action: demoteUser,
    title: "Demote user?",
    description: "This action will demote the user from admin.",
    buttonLabel: "Demote User",
    executingLabel: "Demoting...",
    successLabel: "User demoted successfully",
  },
  {
    label: "Delete",
    action: deleteUser,
    title: "Delete user?",
    description: "This action will delete the user from the platform.",
    buttonLabel: "Delete User",
    executingLabel: "Deleting...",
    successLabel: "User deleted successfully",
  },
]

export function ActionsMenu({ user }: { user: User }) {
  // Filter actions based on user status
  const filteredActions = actions.filter((action) => {
    if (action.label === "Promote" && user.role === "admin") return false
    if (action.label === "Demote" && user.role === "user") return false
    if (action.label === "Ban" && user.banned) return false
    if (action.label === "Unban" && !user.banned) return false
    return true
  })

  // Create a dynamic object of action hooks
  const actionStates = filteredActions.reduce<ActionStates>((acc, action) => {
    const { execute, isExecuting } = useAction(action.action, {
      onSuccess() {
        toast.success(action.successLabel)
      },
      onError({ error }) {
        toast.error(parseActionError(error))
      },
    })

    return {
      ...acc,
      [action.label]: {
        execute,
        isExecuting,
      },
    }
  }, {} as Record<(typeof actions)[number]["label"], { execute: (input: { id: string }) => void | Promise<void>; isExecuting: boolean }>)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filteredActions.map((action) => (
          <AlertDialog key={action.label}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                {action.label}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{action.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {action.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    actionStates[action.label].execute({ id: user.id })
                  }
                  disabled={actionStates[action.label].isExecuting}
                >
                  {actionStates[action.label].isExecuting
                    ? action.executingLabel
                    : action.buttonLabel}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
