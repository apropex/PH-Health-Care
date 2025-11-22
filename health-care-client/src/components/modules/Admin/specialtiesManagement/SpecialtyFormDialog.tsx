"use client";

import CustomButton from "@/components/buttons/CustomButton";
import LoadingButton from "@/components/buttons/LoadingButton";
import ErrorFormDescription from "@/components/shared/ErrorFormDescription";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { iChildren } from "@/interfaces";
import { createSpecialty } from "@/services/admin/specialtiesManagement";
import { ImageIcon, Save, X, XIcon } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface SpecialtiesFormProps extends iChildren {
  open: boolean;
  onClose: (open: boolean) => void;
  onSuccess: () => void;
}

type E = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

export default function SpecialtyFormDialog({
  children,
  open,
  onClose,
  onSuccess,
}: SpecialtiesFormProps) {
  const [state, action, isPending] = useActionState(createSpecialty, null);
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (() => {
      setImageError(null);
      if (state && !state.success && state.message) {
        if (!image) setImageError("Specialty icon is required");
        toast.error(state.message);
      } else if (state && state.success) {
        toast.success("Specialty created successfully!");
        onSuccess();
        onClose(false);
        setImage(null);
        // if (fileInputRef.current) fileInputRef.current.value = "";
      }
    })();
  }, [state, image, onSuccess, onClose]);

  const handleDeleteImage = (e: E) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.value = "";
    setImage(null);
  };
  const handleClickImage = (e: E) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Specialty</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-2 my-8">
          {image && (
            <div className="relative">
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-3 -right-12 bg-destructive text-white rounded-xs p-px pointer-events-auto"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="size-20 rounded-full border ">
            {image ? (
              <Image
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC..."
                src={URL.createObjectURL(image)}
                alt="Profile Image"
                width={80}
                height={80}
                className="size-20 object-cover rounded-full"
              />
            ) : (
              <button
                type="button"
                className="cursor-pointer size-20 rounded-full flex items-center justify-center"
                onClick={handleClickImage}
              >
                <ImageIcon />
              </button>
            )}
          </div>

          <p className="text-sm text-muted-foreground">Add Specialty Icon</p>
          {imageError && <p className="text-xs text-destructive">{imageError}</p>}
        </div>

        <form action={action} id="create_specialty_form">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            name="file"
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />

          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              name="title"
              type="text"
              placeholder="Enter specialty title"
              required
            />
            <ErrorFormDescription state={state} fieldName="title" />
          </Field>
        </form>

        <div className="flex items-center justify-end gap-3">
          <CustomButton size="sm" variant="outline" icon={XIcon} className="h-9">
            Cancel
          </CustomButton>

          <LoadingButton
            form="create_specialty_form"
            size="sm"
            isLoading={isPending}
            loadingText="Submitting..."
            type="submit"
            icon={Save}
          >
            Submit
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
