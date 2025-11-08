"use client";

import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import { Input } from "./input";

export default function Password({ ...field }: ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        className="pr-10"
        {...field}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-muted-foreground/70"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
