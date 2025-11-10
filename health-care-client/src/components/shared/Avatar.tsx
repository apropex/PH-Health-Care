"use client";

import { getInitials } from "@/utility/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface iProps {
  className?: string;
  src: string;
  alt: string;
}

export default function AvatarPro({ src, alt, className }: iProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{getInitials(alt)}</AvatarFallback>
    </Avatar>
  );
}
