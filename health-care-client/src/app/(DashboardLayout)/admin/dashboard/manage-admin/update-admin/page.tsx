import UpdateAdminForm from "@/components/modules/Admin/adminManagement/UpdateAdminForm";
import { getAdminById } from "@/services/admin/adminManagement";

interface AdminUpdatePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AdminUpdatePage({ searchParams }: AdminUpdatePageProps) {
  const id = (await searchParams)?.id;
  const admin = (await getAdminById(id!)).data;

  if (!admin) return <div>Admin not found</div>;

  return (
    <div className="">
      <UpdateAdminForm admin={admin} />
    </div>
  );
}
