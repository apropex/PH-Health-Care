//

"use client";

import AvatarUpload from "@/components/AvatarUpload";
import DoctorForm from "@/components/forms/DoctorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  DoctorFormSchema,
  DoctorFormSchemaType,
} from "./form-validation/doctorForm.schema";

export default function CreateDoctorForm() {
  const [avatar, setAvatar] = useState<File | null>(null);

  const form = useForm<DoctorFormSchemaType>({
    resolver: zodResolver(DoctorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      needPasswordChange: "true",
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

  function onSubmit(values: DoctorFormSchemaType) {
    console.log(values);
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 border rounded-2xl">
      <h2 className="text-2xl md:text-4xl font-bold text-center my-4">Doctor-Form</h2>
      <div className="border-t border-muted mb-4" />
      <AvatarUpload setAvatar={setAvatar} />
      <DoctorForm form={form} onSubmit={onSubmit} />
    </div>
  );
}
