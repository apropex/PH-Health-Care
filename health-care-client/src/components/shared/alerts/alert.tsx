/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Alerts() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const showToast = (key: string, message: string, type?: "error" | "warn") => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    const p = newParams.toString();
    const newUrl = p ? `${pathname}?${p}` : pathname;
    router.replace(newUrl, { scroll: false });

    if (type === "error") toast.error(message);
    else if (type === "warn") toast.warning(message);
    else toast.success(message);
  };

  useEffect(() => {
    // login toast
    if (searchParams.get("loggedIn") === "true") {
      showToast("loggedIn", "You've been logged in successfully!");
    }
  }, [searchParams, router, pathname]);

  return null;
}
