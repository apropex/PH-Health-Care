"use client";
import CustomButton from "@/components/buttons/CustomButton";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import SpecialtyFormDialog from "./SpecialtyFormDialog";

export default function SpecialtyManagementHeader() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <ManagementPageHeader
      title="Specialty Management"
      description="Manage specialties information and details"
    >
      <SpecialtyFormDialog open={open} onClose={setOpen} onSuccess={handleSuccess}>
        <CustomButton icon={Plus}>Add Specialty</CustomButton>
      </SpecialtyFormDialog>
    </ManagementPageHeader>
  );
}
