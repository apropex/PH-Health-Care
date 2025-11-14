//

import TablePagination from "@/components/shared/TablePagination";

export default function DashboardPage() {
  return (
    <div className="">
      <h1 className="">This is DashboardPage component</h1>
      {/* <TableSkeleton columns={6} rows={10} action /> */}
      <TablePagination currentPage={7} totalPages={10} />
    </div>
  );
}
