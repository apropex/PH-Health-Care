"use client";
import CustomButton from "@/components/buttons/CustomButton";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function DoctorManagementHeader() {
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
      title="Doctor Management"
      description="Manage doctor information and details"
    >
      <Link href={"/admin/dashboard/manage-doctors/create-doctor"}>
        <CustomButton icon={Plus}>Create Doctor</CustomButton>
      </Link>
    </ManagementPageHeader>
  );
}
