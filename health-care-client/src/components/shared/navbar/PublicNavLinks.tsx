"use client";

import { UserRole } from "@/constants";
import { cn } from "@/lib/utils";
import { useUser } from "@/Providers/UserProvider";
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
  const { user } = useUser();
  const pathname = usePathname();
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
    <div className="flex items-center flex-wrap text-sm text-black/80 dark:text-primary-foreground">
      {roleBasedLinks.map(({ href, name }) => (
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
