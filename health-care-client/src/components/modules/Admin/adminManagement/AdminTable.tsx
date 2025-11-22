"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { iAdmin } from "@/interfaces/admin.interfaces";
import { softDeleteAdmin } from "@/services/admin/adminManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { adminColumns } from "./AdminColumns";

interface AdminTableProps {
  admins: iAdmin[];
}

export default function AdminTable({ admins }: AdminTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const [deletingAdmin, setDeleteAdmin] = useState<iAdmin | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const confirmDelete = async () => {
    if (!deletingAdmin) return;
    setDeleting(true);
    const result = await softDeleteAdmin(deletingAdmin.id);
    setDeleting(false);

    if (result.success) {
      toast.success(result.message || "Admin deleted successfully!");
      setDeleteAdmin(null);
      startTransition(() => {
        router.refresh();
      });
    } else toast.error(result.message || "Failed to delete admin");
  };
  return (
    <>
      <ManagementTable
        data={admins}
        columns={adminColumns}
        onDelete={setDeleteAdmin}
        onEdit={({ id }) =>
          router.push(`/admin/dashboard/manage-admin/update-admin?id=${id}`)
        }
        rowKey={({ id }) => id}
        emptyMessage="No admins found"
        isRefresh={false}
      />
      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeleteAdmin(null)}
        onConfirm={confirmDelete}
        title={deletingAdmin ? deletingAdmin.name : undefined}
        isDeleting={deleting}
      />
    </>
  );
}
