"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface iProps {
  setAvatar: Dispatch<SetStateAction<File | null>>;
  preview?: string;
}

export default function AvatarUpload({ setAvatar, preview }: iProps) {
  const [isPreview, setIsPreview] = useState<string | null | undefined>(preview);
  const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
  });

  const previewUrl = files[0]?.preview || isPreview || null;
  const fileName = files[0]?.file.name || null;

  useEffect(() => {
    if (files?.[0]) setAvatar(files[0].file as File);
    else setAvatar(null);
  }, [files, setAvatar]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <Button
          variant="outline"
          className="relative size-16 overflow-hidden p-0 shadow-none"
          onClick={openFileDialog}
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
          {previewUrl ? (
            <Image
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC..."
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </Button>
        {previewUrl && (
          <Button
            onClick={() => {
              setIsPreview(null);
              removeFile(files[0]?.id);
            }}
            size="icon"
            className="absolute -top-2 -right-2 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
      {fileName && <p className="text-xs text-muted-foreground">{fileName}</p>}
      <p aria-live="polite" role="region" className="mt-2 text-xs text-muted-foreground">
        Upload Avatar
      </p>
    </div>
  );
}
