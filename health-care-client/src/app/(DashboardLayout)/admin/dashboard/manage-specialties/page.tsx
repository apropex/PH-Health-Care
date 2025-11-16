//

import RefreshButton from "@/components/buttons/RefreshButton";
import SpecialtiesTable from "@/components/modules/Admin/specialtiesManagement/SpecialtiesTable";
import SpecialtyManagementHeader from "@/components/modules/Admin/specialtiesManagement/SpecialtyManagementHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { Suspense } from "react";

export default async function ManageSpecialtiesPage() {
  const result = await getSpecialties();
  return (
    <div className="space-y-5">
      <SpecialtyManagementHeader />

      <RefreshButton>Refresh</RefreshButton>

      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialtiesTable specialties={result.data || []} />
      </Suspense>
    </div>
  );
}

//
