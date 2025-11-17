//

import RefreshButton from "@/components/buttons/RefreshButton";
import DoctorManagementHeader from "@/components/modules/Admin/doctorManagement/DoctorManagementHeader";
import DoctorTable from "@/components/modules/Admin/doctorManagement/DoctorTable";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getDoctors } from "@/services/admin/doctorManagement";
import { Suspense } from "react";

export default async function ManageDoctorsPage() {
  const result = await getDoctors();

  return (
    <div className="space-y-5">
      <DoctorManagementHeader />
      <RefreshButton>Refresh</RefreshButton>

      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorTable doctors={result.data || []} />
      </Suspense>
    </div>
  );
}
