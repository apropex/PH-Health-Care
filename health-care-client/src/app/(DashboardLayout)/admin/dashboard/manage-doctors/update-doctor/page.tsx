//

import CustomButton from "@/components/buttons/CustomButton";
import UpdateDoctorForm from "@/components/modules/Admin/doctorManagement/UpdateDoctorForm";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import { getDoctorById } from "@/services/admin/doctorManagement";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const specialties = [
  {
    icon: "",
    id: "this is id 1",
    title: "this is title 1",
  },
  {
    icon: "",
    id: "this is id 2",
    title: "this is title 2",
  },
  {
    icon: "",
    id: "this is id 3",
    title: "this is title 3",
  },
  {
    icon: "",
    id: "this is id 4",
    title: "this is title 4",
  },
  {
    icon: "",
    id: "this is id 5",
    title: "this is title 5",
  },
  {
    icon: "",
    id: "this is id 6",
    title: "this is title 6",
  },
  {
    icon: "",
    id: "this is id 7",
    title: "this is title 7",
  },
  {
    icon: "",
    id: "this is id 8",
    title: "this is title 8",
  },
  {
    icon: "",
    id: "this is id 9",
    title: "this is title 9",
  },
  {
    icon: "",
    id: "this is id 10",
    title: "this is title 10",
  },
];

interface UpdateDoctorDashboardProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function UpdateDoctorDashboard({
  searchParams,
}: UpdateDoctorDashboardProps) {
  const id = (await searchParams)?.id;

  const result = await getDoctorById(id!);

  return (
    <div className="">
      <Link href={"/admin/dashboard/manage-doctors"}>
        <CustomButton icon={ChevronLeft} variant="outline" className="rounded-sm">
          Back
        </CustomButton>
      </Link>

      {result.success ? (
        <UpdateDoctorForm doctor={result.data as iDoctor} specialties={specialties} />
      ) : (
        <p>{result.message}</p>
      )}
    </div>
  );
}
