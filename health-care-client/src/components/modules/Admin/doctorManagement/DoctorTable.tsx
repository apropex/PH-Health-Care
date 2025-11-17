"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import { softDeleteDoctor } from "@/services/admin/doctorManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { doctorColumns } from "./DoctorColumns";

interface DoctorTableProps {
  doctors: iDoctor[];
}

export default function DoctorTable({ doctors }: DoctorTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const [deletingDoctor, setDeleteDoctor] = useState<iDoctor | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const confirmDelete = async () => {
    if (!deletingDoctor) return;
    setDeleting(true);
    const result = await softDeleteDoctor(deletingDoctor.id);
    setDeleting(false);

    if (result.success) {
      toast.success(result.message || "Doctor deleted successfully!");
      setDeleteDoctor(null);
      startTransition(() => {
        router.refresh();
      });
    } else toast.error(result.message || "Failed to delete doctor");
  };

  return (
    <>
      <ManagementTable
        data={doctors}
        columns={doctorColumns}
        onDelete={setDeleteDoctor}
        onEdit={({ id }) =>
          router.push(`/admin/dashboard/manage-doctors/update-doctor?id=${id}`)
        }
        onView={({ id }) =>
          router.push(`/admin/dashboard/manage-doctors/view-doctor?id=${id}`)
        }
        rowKey={(specialty) => specialty.id}
        emptyMessage="No doctors found"
        isRefresh={false}
      />
      <DeleteConfirmationDialog
        open={!!deletingDoctor}
        onOpenChange={(open) => !open && setDeleteDoctor(null)}
        onConfirm={confirmDelete}
        title={deletingDoctor ? deletingDoctor.name : undefined}
        isDeleting={deleting}
      />
    </>
  );
}
