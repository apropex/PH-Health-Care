//

import CustomButton from "@/components/buttons/CustomButton";
import RefreshButton from "@/components/buttons/RefreshButton";
import AdminTable from "@/components/modules/Admin/adminManagement/AdminTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iAdmin } from "@/interfaces/admin.interfaces";
import { getAdmins } from "@/services/admin/adminManagement";
import { queryFormatter } from "@/utility/queryFormatter";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface ManageAdminProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageAdminPage({ searchParams }: ManageAdminProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const result = await getAdmins(query);

  const totalPage = (result as iResponse<iAdmin[]>).meta?.total_page || 1;
  const currentPage = (result as iResponse<iAdmin[]>).meta?.present_page || 1;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Admin Management"
        description="Manage admin information and details"
      >
        <Link href={"/admin/dashboard/manage-admin/create-admin"}>
          <CustomButton variant="outline" icon={Plus}>
            Create Admin
          </CustomButton>
        </Link>
      </ManagementPageHeader>

      <div className="flex items-center flex-wrap gap-4">
        <SearchFilter />
        <SelectFilter
          placeholder="Find deleted or active admins"
          paramName="isDeleted"
          options={[
            { label: "All", value: "all" },
            { label: "Deleted", value: "true" },
            { label: "Active", value: "false" },
          ]}
        />
        <RefreshButton variant="outline">Refresh</RefreshButton>
      </div>

      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <AdminTable admins={result.data || []} />
        <TablePagination totalPages={totalPage} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
