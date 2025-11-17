"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { iChildren } from "@/interfaces";
import { _fetch } from "@/utility/_fetch";
import { Trash2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CustomButton from "../buttons/CustomButton";
import LoadingButton from "../buttons/LoadingButton";

interface ConfirmationDialogProps extends Partial<iChildren> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: (id?: string) => Promise<void>;
  id?: string;
  api?: string;
  title?: string;
  description?: string;
  itemName?: string;
  isDeleting?: boolean;
}

export default function DeleteConfirmationDialog({
  children,
  open,
  onOpenChange,
  onConfirm,
  id,
  api,
  title = "Are you absolutely sure?",
  description,
  itemName,
  isDeleting,
}: ConfirmationDialogProps) {
  const [selfOpen, setSelfOpen] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleConfirm = async () => {
    await onConfirm?.(id);
    await handleDelete();
    setSelfOpen(false);
  };

  const handleOpenDialog = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    setSelfOpen(isOpen);
  };

  const handleDelete = async () => {
    if (!api) return;
    setRemoving(true);
    const result = await _fetch.delete<unknown>(api);
    if (result.success) {
      toast.success(`${itemName || "Item"} deleted successfully!`);
    } else toast.error(`Failed to delete ${itemName || "item"}`);
    setRemoving(false);
  };

  return (
    <AlertDialog open={open || selfOpen} onOpenChange={handleOpenDialog}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || (
              <p>
                This action cannot be undone. This will permanently delete your{" "}
                <strong>{itemName || "item"}</strong> and remove from our server.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <CustomButton size="sm" icon={XIcon} disabled={isDeleting || removing}>
              Cancel
            </CustomButton>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              onClick={handleConfirm}
              disabled={isDeleting || removing}
              isLoading={isDeleting || removing}
              loadingText="Deleting..."
              icon={Trash2Icon}
              variant="destructive"
            >
              Delete
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
