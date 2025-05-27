import { OrganizationSwitcher } from "@/components/models/organizations/switcher";
import { Home, Settings } from "lucide-react";
import { UserInfo } from "@/components/app/user-info";
import { Logo } from "@/components/site/logo";

import {
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  Sidebar,
} from "@/components/ui/sidebar";

import { getSession } from "@/lib/auth/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const items = [
  {
    title: "Home",
    url: "/workspace",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/workspace/settings",
    icon: Settings,
  },
];

export const AppSidebar = async () => {
  const session = await getSession();
  const orgs = await auth.api.listOrganizations({
    headers: await headers(),
  });

  return (
    <Sidebar>
      <SidebarContent className="grid grid-rows-[auto_1fr_auto]">
        <SidebarHeader className="w-full pt-4">
          <Logo />
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter>
          <OrganizationSwitcher
            className="w-full"
            organizations={orgs}
            activeOrganization={session?.session.activeOrganizationId ?? ""}
          />
          {session && <UserInfo user={session.user} />}
          <SidebarMenuButton asChild className="mt-8">
            <SidebarTrigger className="w-fit" />
          </SidebarMenuButton>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};
