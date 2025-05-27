"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

import { useAction } from "next-safe-action/hooks";
import { signOut } from "@/lib/auth/actions";
import { toast } from "sonner";

export function SignOutButton({ className }: { className?: string }) {
  const { execute, isExecuting } = useAction(signOut, {
    onSuccess() {
      toast.success("You have been successfully signed out");
    },
    onError() {
      toast.error("Failed to sign out.");
    },
  });
  return (
    <Button
      className={className}
      disabled={isExecuting}
      onClick={() => execute()}
      variant="outline"
    >
      Sign Out
    </Button>
  );
}

export function SignOutIconButton({ className }: { className?: string }) {
  const { execute, isExecuting } = useAction(signOut, {
    onSuccess() {
      toast.success("You have been successfully signed out");
    },
    onError() {
      toast.error("Failed to sign out.");
    },
  });
  return (
    <button
      disabled={isExecuting}
      onClick={() => execute()}
      className={className}
    >
      <span className="sr-only">Sign Out</span>
      <LogOut size={16} />
    </button>
  );
}
