"use client";

import { useUser } from "@/Providers/UserProvider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRole } from "@/constants";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav_links } from "./PublicNavLinks";

export function MobileMenuLinks() {
  const pathname = usePathname();
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  let roleBasedLinks = [...nav_links];

  if (user) {
    switch (user.role) {
      case UserRole.ADMIN:
        roleBasedLinks.push({ href: "/admin/dashboard", name: "Dashboard" });
        break;

      case UserRole.DOCTOR:
        roleBasedLinks.push({ href: "/doctor/dashboard", name: "Dashboard" });
        break;

      case UserRole.PATIENT:
        roleBasedLinks.push({ href: "/dashboard", name: "Dashboard" });
        break;

      default:
        roleBasedLinks = nav_links;
        break;
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button>
          <MenuIcon size={20} />
        </button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primary text-xl">PH-Health-Care</SheetTitle>
          <SheetDescription className="sr-only"></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-wrap px-3 text-sm text-muted-foreground">
          {roleBasedLinks.map(({ href, name }) => (
            <Link
              href={href}
              key={href}
              onClick={() => setOpen(false)}
              className={cn(
                " rounded-[4px] px-3 py-1.5 hover:bg-primary/10",
                "transition-all duration-200",
                {
                  "bg-primary hover:bg-primary/90 text-white": pathname === href,
                },
              )}
            >
              {name}
            </Link>
          ))}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
