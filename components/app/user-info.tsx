import { SignOutIconButton } from "../auth/signout";
import { User2 } from "lucide-react";

import type { User } from "better-auth";

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <div className="w-full text-sm px-2 group-data-[collapsible=icon]:hidden">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <User2 size={16} className="text-muted-foreground" />
        <span className="truncate">{user.name}</span>
        <SignOutIconButton className="size-8" />
      </div>
    </div>
  );
};
