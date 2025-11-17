"use client";

import AvatarUpload from "@/components/AvatarUpload";
import DoctorForm from "@/components/modules/Admin/doctorManagement/DoctorForm";
import { iDoctor, iSpecialty } from "@/interfaces/doctor.interfaces";
import { updateDoctor } from "@/services/admin/doctorManagement";
import {
  CreateDoctorSchema_client,
  DoctorFormSchemaType_client,
} from "@/zod/doctor-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface iProps {
  doctor: iDoctor;
  specialties: iSpecialty[];
}

export function generateDefaultItems<T extends { id: string }>(
  allItems: T[],
  selectedIds: string[]
) {
  return allItems?.map((item) => ({
    ...item,
    selected: selectedIds?.includes(item?.id),
  }));
}

export function diffSelections(previous: string[], current: string[]) {
  const prevSet = new Set(previous);
  const currSet = new Set(current);

  const add = [...currSet].filter((id) => !prevSet.has(id));
  const remove = [...prevSet].filter((id) => !currSet.has(id));

  return { add, remove };
}

export default function UpdateDoctorForm({ doctor, specialties = [] }: iProps) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [specialtiesIds, setSpecialtiesIds] = useState<string[]>([]);

  const router = useRouter();

  const previousIds = doctor ? doctor.doctorSpecialties?.map((s) => s.specialtiesId) : [];
  const defaultItems = generateDefaultItems(specialties, previousIds);

  const form = useForm<DoctorFormSchemaType_client>({
    resolver: zodResolver(CreateDoctorSchema_client),
    defaultValues: {
      name: doctor.name || "",
      email: doctor.email || "",
      contactNumber: doctor.contactNumber || "",
      needPasswordChange: true,
      gender: doctor.gender || "",
      password: "",
      address: doctor.address || "",
      registrationNumber: doctor.registrationNumber || "",
      experience: doctor.experience || 0,
      appointmentFee: doctor.appointmentFee || 0,
      qualification: doctor.qualification || "",
      designation: doctor.designation || "",
      currentWorkingPlace: doctor.currentWorkingPlace || "",
    },
  });

  async function onSubmit(values: DoctorFormSchemaType_client) {
    if (!avatar && !doctor.profilePhoto) {
      setAvatarError("Avatar is required");
      return;
    }

    const { add: addIds, remove: deleteIds } = diffSelections(
      previousIds,
      specialtiesIds
    );

    setAvatarError(null);
    const result = await updateDoctor(
      doctor.id,
      values,
      { addIds, deleteIds },
      avatar ?? undefined
    );
    if (result.success) {
      router.push("/admin/dashboard/manage-doctors");
      toast.success(result.message);
    } else toast.error(result.message);
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 border rounded-2xl">
      <h2 className="text-2xl md:text-4xl font-bold text-center my-4">Doctor-Form</h2>
      <div className="border-t border-muted mb-4" />
      <AvatarUpload setAvatar={setAvatar} preview={doctor.profilePhoto} />
      {avatarError && !avatar && (
        <p className="text-destructive text-sm">{avatarError}</p>
      )}
      <DoctorForm
        form={form}
        onSubmit={onSubmit}
        setSpecialtiesIds={setSpecialtiesIds}
        specialties={defaultItems}
        isEdit={true}
      />
    </div>
  );
}
