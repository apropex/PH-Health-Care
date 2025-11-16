"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { iSpecialty } from "@/interfaces/doctor.interfaces";
import { deleteSpecialty } from "@/services/admin/specialtiesManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { specialtyColumns } from "./SpecialtiesColumn";

interface SpecialtyTableProps {
  specialties: iSpecialty[];
}

export default function SpecialtiesTable({ specialties }: SpecialtyTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const [deletingSpecialty, setDeleteSpecialty] = useState<iSpecialty | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deletingSpecialty) return;
    setDeleting(true);
    const result = await deleteSpecialty(deletingSpecialty.id);
    setDeleting(false);

    if (result.success) {
      toast.success(result.message || "Specialty deleted successfully!");
      setDeleteSpecialty(null);
      handleRefresh();
    } else toast.error(result.message || "Failed to delete specialty");
  };

  return (
    <>
      <ManagementTable
        data={specialties}
        columns={specialtyColumns}
        onDelete={setDeleteSpecialty}
        rowKey={(specialty) => specialty.id}
        emptyMessage="No specialties found"
        isRefresh={false}
      />
      <DeleteConfirmationDialog
        open={!!deletingSpecialty}
        onOpenChange={(open) => !open && setDeleteSpecialty(null)}
        onConfirm={confirmDelete}
        title={deletingSpecialty ? deletingSpecialty.title : undefined}
        isDeleting={deleting}
      />
    </>
  );
}
