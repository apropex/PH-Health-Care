"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function ModeToggler() {
  const { setTheme, systemTheme } = useTheme();

  return (
    <div className="border-b py-4">
      <h3 className="text-lg md:text-xl">Switch Theme</h3>
      <div className="w-full max-w-sm flex mt-2">
        <button
          onClick={() => setTheme("light")}
          className="flex-1 bg-white text-black/90 p-2 border"
        >
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="flex-1 bg-black text-white p-2 border border-x-0"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme("system")}
          className={cn("flex-1 bg-white text-black/90 p-2 border", {
            "bg-black text-white": systemTheme === "dark",
          })}
        >
          System
        </button>
      </div>
    </div>
  );
}
