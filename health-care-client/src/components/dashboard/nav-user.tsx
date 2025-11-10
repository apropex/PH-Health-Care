import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import getUserFromJwtPayload from "@/hooks/getUserFromJwtPayload";
import { CircleUserRound, CreditCard, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../buttons/CustomButton";
import AvatarPro from "../shared/Avatar";
import Logout from "../shared/alerts/logout-alert";

export async function NavUser() {
  const decoded = await getUserFromJwtPayload();

  const avatar = decoded?.avatar || "/avatar.png";

  if (!decoded) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="size-6 rounded-[0.4rem] flex items-center justify-center overflow-hidden">
              <Image
                src={avatar}
                alt={decoded.name}
                width={28}
                height={28}
                className="object-cover size-6"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg mt-4"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <AvatarPro
                  src={avatar}
                  alt={decoded.name}
                  className="size-8 grayscale rounded-[0.5rem]"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{decoded.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {decoded.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={"/my-profile"}>
                  <CircleUserRound />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/settings"}>
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Logout>
                <CustomButton
                  icon={LogOut}
                  size="sm"
                  className="w-full justify-start pl-2 bg-background text-foreground hover:bg-destructive/30 text-base"
                  iconClass="size-7"
                >
                  Log out
                </CustomButton>
              </Logout>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
