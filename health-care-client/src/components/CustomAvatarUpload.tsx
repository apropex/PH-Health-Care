"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef } from "react";

interface CustomAvatarUploadProps {
  setAvatar: Dispatch<SetStateAction<File | null>>;
  avatar: File | null;
  label?: string;
  avatarError?: string | null;
}

export default function CustomAvatarUpload({
  setAvatar,
  avatar,
  label,
  avatarError,
}: CustomAvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-8">
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.value = "";
            setAvatar(null);
          }}
          className="absolute top-3 -right-12 bg-destructive text-white rounded-xs p-px pointer-events-auto"
        >
          <X size={16} />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        name="avatar"
        className="hidden"
        id="avatar-input"
        onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
      />
      <label
        htmlFor="avatar-input"
        className={cn("cursor-pointer", {
          "cursor-default pointer-events-none": !!avatar,
        })}
      >
        <div className="size-20 rounded-full flex items-center justify-center border ">
          {avatar ? (
            <Image
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC..."
              src={URL.createObjectURL(avatar)}
              alt="Profile Image"
              width={80}
              height={80}
              className="size-20 object-cover rounded-full"
            />
          ) : (
            <ImageIcon />
          )}
        </div>
      </label>

      <p className="text-sm text-muted-foreground">{label || "Select an Avatar"}</p>
      {avatarError && <p className="text-xs text-destructive">{avatarError}</p>}
    </div>
  );
}
