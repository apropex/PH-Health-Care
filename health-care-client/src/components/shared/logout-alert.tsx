"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { iChildren } from "@/interfaces";
import { useUser } from "@/Providers/UserProvider";
import { LogOutIcon, ShieldAlert, XIcon } from "lucide-react";
import { useState } from "react";
import CustomButton from "../buttons/CustomButton";
import LoadingButton from "../buttons/LoadingButton";

export default function Logout({ children }: iChildren) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/logout");
      setOpen(false);
      setUser(null);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-xs">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-rose-100 dark:bg-rose-950 p-2">
              <ShieldAlert className="size-6 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-none">Log out?</h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                You&apos;ll be signed out of your account.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <CustomButton
              size="sm"
              variant="outline"
              icon={XIcon}
              onClick={() => setOpen(false)}
            >
              Cancel
            </CustomButton>
            <LoadingButton
              size="sm"
              variant="destructive"
              onClick={handleLogout}
              icon={LogOutIcon}
              isLoading={loading}
              loadingText="Logging out"
              className="flex items-center gap-1"
            >
              Log out
            </LoadingButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
