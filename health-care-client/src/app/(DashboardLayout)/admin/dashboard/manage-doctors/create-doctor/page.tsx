//

import CustomButton from "@/components/buttons/CustomButton";
import CreateDoctorForm from "@/components/modules/Admin/doctorManagement/CreateDoctorForm";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateDoctorDashboard() {
  const specialties = (await getSpecialties()).data;

  return (
    <div className="">
      <Link href={"/admin/dashboard/manage-doctors"}>
        <CustomButton icon={ChevronLeft} variant="outline" className="rounded-sm">
          Back
        </CustomButton>
      </Link>
      <CreateDoctorForm specialties={specialties || []} />
    </div>
  );
}
