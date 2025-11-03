/* eslint-disable react-hooks/incompatible-library */
//

"use client";

import DoctorForm from "@/components/forms/DoctorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DoctorFormSchema, DoctorFormSchemaType } from "./doctorForm.schema";

export default function CreateDoctorForm() {
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
    <>
      <DoctorForm form={form} onSubmit={onSubmit} />
    </>
  );
}
