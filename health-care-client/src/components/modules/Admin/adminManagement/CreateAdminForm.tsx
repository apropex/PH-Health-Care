"use client";

import AvatarUpload from "@/components/AvatarUpload";
import { createAdmin } from "@/services/admin/adminManagement";
import { CreateAdminSchema, CreateAdminSchemaType } from "@/zod/admin-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AdminForm from "./AdminForm";

export default function CreateAdminForm() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<CreateAdminSchemaType>({
    resolver: zodResolver(CreateAdminSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      needPasswordChange: true,
      password: "",
    },
  });

  async function onSubmit(values: CreateAdminSchemaType) {
    if (!avatar) {
      setAvatarError("Avatar is required");
      return;
    }
    setAvatarError(null);
    setLoading(true);

    const result = await createAdmin(values, avatar);
    if (result.success) {
      router.push("/admin/dashboard/manage-admin");
      toast.success(result.message);
    } else toast.error(result.message);
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 border rounded-2xl">
      <h2 className="text-2xl md:text-4xl font-bold text-center my-4">Admin-Form</h2>
      <div className="border-t border-muted mb-4" />
      <AvatarUpload setAvatar={setAvatar} />
      {avatarError && !avatar && (
        <p className="text-destructive text-sm text-center">{avatarError}</p>
      )}
      <AdminForm form={form} onSubmit={onSubmit} loading={loading} />
    </div>
  );
}
