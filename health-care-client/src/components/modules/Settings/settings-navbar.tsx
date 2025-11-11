"use client";

import { cn } from "@/lib/utils";
import joinText from "@/utility/joinText";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsMenu = [
  { href: "/settings/my-details", name: "My Details" },
  { href: "/settings/profile", name: "Profile" },
  { href: "/settings/password", name: "Password" },
  { href: "/settings/preferences", name: "Preferences" },
  { href: "/settings/billings", name: "Billings" },
  { href: "/settings/notifications", name: "Notifications" },
];

export default function SettingsNavbar() {
  const pathname = usePathname();

  //
  return (
    <div className="w-full flex items-center">
      {settingsMenu.map((menu, i) => (
        <Link
          href={menu.href}
          key={joinText("settings-menu-", i)}
          className={cn("flex-1 bg-accent text-center p-2", {
            "bg-background border-b border-foreground/60 dark:border-foreground":
              menu.href === pathname,
          })}
        >
          {menu.name}
        </Link>
      ))}
    </div>
  );
}
