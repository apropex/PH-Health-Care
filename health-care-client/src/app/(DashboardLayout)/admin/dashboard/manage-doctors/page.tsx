//

import RefreshButton from "@/components/buttons/RefreshButton";
import DoctorManagementHeader from "@/components/modules/Admin/doctorManagement/DoctorManagementHeader";
import DoctorTable from "@/components/modules/Admin/doctorManagement/DoctorTable";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { Suspense } from "react";

export default async function ManageDoctorsPage() {
  const result = await getDoctors();
  const specialties = (await getSpecialties()).data || [];

  const selectFields = specialties.map(({ title }) => ({ label: title, value: title }));

  return (
    <div className="space-y-5">
      <DoctorManagementHeader />

      <div className="flex items-center flex-wrap gap-4">
        <SearchFilter />
        <SelectFilter
          paramName="specialty"
          options={[{ label: "All", value: "all" }, ...selectFields]}
        />
        <RefreshButton variant="outline">Refresh</RefreshButton>
      </div>

      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorTable doctors={result.data || []} />
      </Suspense>
    </div>
  );
}
