import { StarIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import getUserFromJwtPayload from "@/hooks/getUserFromJwtPayload";
import Link from "next/link";
import SidebarMenuComponent from "./SidebarMenu";

export default async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await getUserFromJwtPayload();

  if (!user) return <div></div>;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <StarIcon className="size-5" />
                <span className="text-base font-semibold">PH-Health-Care</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuComponent role={user.role} />
      </SidebarContent>
    </Sidebar>
  );
}
