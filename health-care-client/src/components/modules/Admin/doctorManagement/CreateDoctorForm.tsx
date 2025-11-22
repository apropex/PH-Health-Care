"use client";

import AvatarUpload from "@/components/AvatarUpload";
import DoctorForm from "@/components/modules/Admin/doctorManagement/DoctorForm";
import { iSpecialty } from "@/interfaces/doctor.interfaces";
import { createDoctor } from "@/services/admin/doctorManagement";
import {
  CreateDoctorSchema_client,
  DoctorFormSchemaType_client,
} from "@/zod/doctor-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateDoctorForm({ specialties }: { specialties: iSpecialty[] }) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [specialtiesIds, setSpecialtiesIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<DoctorFormSchemaType_client>({
    resolver: zodResolver(CreateDoctorSchema_client),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      needPasswordChange: true,
      gender: "MALE",
      password: "",
      address: "",
      registrationNumber: "",
      experience: 0,
      appointmentFee: 0,
      qualification: "",
      designation: "",
      currentWorkingPlace: "",
    },
  });

  async function onSubmit(values: DoctorFormSchemaType_client) {
    if (!avatar) {
      setAvatarError("Avatar is required");
      return;
    }
    setAvatarError(null);
    // TODO: throw an error is specialtiesIds is []
    setLoading(true);
    const result = await createDoctor(values, specialtiesIds, avatar);
    if (result.success) {
      router.push("/admin/dashboard/manage-doctors");
      toast.success(result.message);
    } else toast.error(result.message);
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 border rounded-2xl">
      <h2 className="text-2xl md:text-4xl font-bold text-center my-4">Doctor-Form</h2>
      <div className="border-t border-muted mb-4" />
      <AvatarUpload setAvatar={setAvatar} />
      {avatarError && !avatar && (
        <p className="text-destructive text-sm">{avatarError}</p>
      )}
      <DoctorForm
        form={form}
        onSubmit={onSubmit}
        setSpecialtiesIds={setSpecialtiesIds}
        specialties={specialties}
        loading={loading}
      />
    </div>
  );
}
