"use client";

import AvatarUpload from "@/components/AvatarUpload";
import { iAdmin } from "@/interfaces/admin.interfaces";
import { updateAdmin } from "@/services/admin/adminManagement";
import { CreateAdminSchema, CreateAdminSchemaType } from "@/zod/admin-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AdminForm from "./AdminForm";

interface UpdateAdminFormProps {
  admin: iAdmin;
}

export default function UpdateAdminForm({ admin }: UpdateAdminFormProps) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<CreateAdminSchemaType>({
    resolver: zodResolver(CreateAdminSchema),
    defaultValues: {
      name: admin.name || "",
      email: admin.email || "",
      contactNumber: admin.contactNumber || "",
      needPasswordChange: true,
      password: "",
    },
  });

  async function onSubmit(values: CreateAdminSchemaType) {
    if (!avatar && !admin.profilePhoto) {
      setAvatarError("Avatar is required");
      return;
    }
    setAvatarError(null);
    setLoading(true);

    const result = await updateAdmin(admin.id, values, avatar ?? undefined);
    if (result.success) {
      router.push("/admin/dashboard/manage-admin");
      toast.success(result.message);
    } else toast.error(result.message);
    setLoading(false);
  }

  // https://www.youtube.com/watch?v=G2iYKxj0x6g

  return (
    <div className="max-w-4xl mx-auto mt-8 border rounded-2xl">
      <h2 className="text-2xl md:text-4xl font-bold text-center my-4">Admin-Form</h2>
      <div className="border-t border-muted mb-4" />
      <AvatarUpload setAvatar={setAvatar} preview={admin.profilePhoto || ""} />
      {avatarError && !avatar && (
        <p className="text-destructive text-sm text-center">{avatarError}</p>
      )}
      <AdminForm form={form} onSubmit={onSubmit} loading={loading} isEdit={true} />
    </div>
  );
}
