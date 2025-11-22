"use client";

import { iSpecialty } from "@/interfaces/doctor.interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface DoctorFiltersProps {
  specialties: iSpecialty[];
}

export default function DoctorFilters({ specialties }: DoctorFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  return <div></div>;
}
