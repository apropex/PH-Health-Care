//

import CustomButton from "@/components/buttons/CustomButton";
import RefreshButton from "@/components/buttons/RefreshButton";
import DoctorTable from "@/components/modules/Admin/doctorManagement/DoctorTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { queryFormatter } from "@/utility/queryFormatter";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface ManageDoctorProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageDoctorsPage({ searchParams }: ManageDoctorProps) {
  const params = await searchParams;

  const query = queryFormatter(params);

  const result = await getDoctors(query);
  const specialties = (await getSpecialties()).data || [];

  const selectFields = specialties.map(({ title }) => ({ label: title, value: title }));

  const totalPage = (result as iResponse<iDoctor[]>).meta?.total_page || 1;
  const currentPage = (result as iResponse<iDoctor[]>).meta?.present_page || 1;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Doctor Management"
        description="Manage doctor information and details"
      >
        <Link href={"/admin/dashboard/manage-doctors/create-doctor"}>
          <CustomButton icon={Plus}>Create Doctor</CustomButton>
        </Link>
      </ManagementPageHeader>

      <div className="flex items-center flex-wrap gap-4">
        <SearchFilter />
        <SelectFilter
          paramName="specialties"
          options={[{ label: "All", value: "all" }, ...selectFields]}
        />
        <RefreshButton variant="outline">Refresh</RefreshButton>
      </div>

      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorTable doctors={result.data || []} />
        <TablePagination totalPages={totalPage} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
