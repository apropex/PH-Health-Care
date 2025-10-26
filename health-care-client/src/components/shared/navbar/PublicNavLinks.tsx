"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const nav_links = [
  { href: "/", name: "Home" },
  { href: "/consultation", name: "Consultation" },
  { href: "/health-plans", name: "Health Plans" },
  { href: "/medicine", name: "Medicine" },
  { href: "/diagnostics", name: "Diagnostics" },
  { href: "/ngos", name: "NGOs" },
];

export default function PublicNavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center flex-wrap text-sm text-muted-foreground">
      {nav_links.map(({ href, name }) => (
        <Link
          href={href}
          key={href}
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
  );
}
