/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { cn } from "@/lib/utils";

interface iProps {
  state: any;
  fieldName: string;
  className?: string;
}

export default function ErrorFormDescription({ state, fieldName, className }: iProps) {
  let error: string | null = null;

  if (state?.errors) {
    error = state.errors.find((error: any) => error.field === fieldName)?.message;
  }

  if (error) return <p className={cn("text-destructive", className)}>{error}</p>;
  else return null;
}
