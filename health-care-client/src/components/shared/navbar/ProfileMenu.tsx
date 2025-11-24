import CustomButton from "@/components/buttons/CustomButton";
import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getUserFromJwtPayload from "@/hooks/getUserFromJwtPayload";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utility/getInitials";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import Logout from "../alerts/logout-alert";
import AvatarPro from "../Avatar";

export default async function ProfileMenu() {
  const decoded = await getUserFromJwtPayload();

  const avatar = decoded?.avatar || "/avatar.png";

  return (
    <div>
      {!decoded ? (
        <Link href={"/login"}>
          <Button size={"responsive"}>Login</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="rounded-md cursor-pointer">
              <AvatarImage src={avatar} alt={decoded.name} />
              <AvatarFallback>{getInitials(decoded.name)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(
              "w-56 max-h-80 md:max-h-96 overflow-y-auto mt-4",
              " [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:my-6 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600/40 dark:[&::-webkit-scrollbar-thumb]:bg-gray-300/40 [&::-webkit-scrollbar-thumb]:rounded-full",
            )}
            align="end"
          >
            <DropdownMenuLabel className="flex items-start gap-3">
              <AvatarPro src={avatar} alt={decoded.name} className="rounded-md" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                  {decoded.name}
                </span>
                <span className="truncate text-xs font-normal text-muted-foreground">
                  {decoded.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-xs">
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <ModeToggle />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-sm" variant="destructive" asChild>
              <Logout>
                <CustomButton
                  icon={LogOutIcon}
                  iconRight
                  size="sm"
                  className="w-full justify-between pl-2 bg-background text-foreground hover:bg-destructive/20"
                >
                  Log out
                </CustomButton>
              </Logout>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
