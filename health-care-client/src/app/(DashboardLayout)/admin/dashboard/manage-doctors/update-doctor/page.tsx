//

import CustomButton from "@/components/buttons/CustomButton";
import UpdateDoctorForm from "@/components/modules/Admin/doctorManagement/UpdateDoctorForm";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import { getDoctorById } from "@/services/admin/doctorManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface UpdateDoctorDashboardProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function UpdateDoctorDashboard({
  searchParams,
}: UpdateDoctorDashboardProps) {
  const id = (await searchParams)?.id;
  const specialties = (await getSpecialties()).data;
  const result = await getDoctorById(id!);

  return (
    <div className="">
      <Link href={"/admin/dashboard/manage-doctors"}>
        <CustomButton icon={ChevronLeft} variant="outline" className="rounded-sm">
          Back
        </CustomButton>
      </Link>

      {result.success ? (
        <UpdateDoctorForm
          doctor={result.data as iDoctor}
          specialties={specialties || []}
        />
      ) : (
        <p>{result.message}</p>
      )}
    </div>
  );
}
