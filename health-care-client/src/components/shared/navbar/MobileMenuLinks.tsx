"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { iChildren } from "@/interfaces";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav_links } from "./PublicNavLinks";

export function MobileMenuLinks({ children }: iChildren) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primary text-xl">PH-Health-Care</SheetTitle>
          <SheetDescription className="sr-only"></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-wrap px-3 text-sm text-muted-foreground">
          {nav_links.map(({ href, name }) => (
            <Link
              href={href}
              key={href}
              onClick={() => setOpen(false)}
              className={cn(
                " rounded-[4px] px-3 py-1.5 hover:bg-primary/10",
                "transition-all duration-200",
                {
                  "bg-primary hover:bg-primary/90 text-white": pathname === href,
                }
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
