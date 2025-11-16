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
} from "@/components/ui/alert-dialog";
import { XIcon } from "lucide-react";
import CustomButton from "../buttons/CustomButton";
import LoadingButton from "../buttons/LoadingButton";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  isDeleting?: boolean;
}

export default function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you absolutely sure?",
  description,
  itemName,
  isDeleting,
}: ConfirmationDialogProps) {
  //
  const defaultDescription = `This action cannot be undone. This will permanently delete your ${(
    <strong>{itemName || "item"}</strong>
  )} and remove from our server.`;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <CustomButton size="sm" icon={XIcon} disabled={isDeleting}>
              Cancel
            </CustomButton>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              onClick={onConfirm}
              disabled={isDeleting}
              isLoading={isDeleting || false}
              loadingText="Deleting..."
            >
              Delete
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
