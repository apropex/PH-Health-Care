import CustomButton from "@/components/buttons/CustomButton";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DoctorManagementHeader() {
  return (
    <ManagementPageHeader
      title="Doctor Management"
      description="Manage doctor information and details"
    >
      <Link href={"/admin/dashboard/manage-doctors/create-doctor"}>
        <CustomButton icon={Plus}>Create Doctor</CustomButton>
      </Link>
    </ManagementPageHeader>
  );
}
