import { iTableColumns } from "@/components/shared/ManagementTable";
import UserInfoCell from "@/components/shared/UserInfoCell";
import UserStatusCell from "@/components/shared/UserStatusCell";
import { iAdmin } from "@/interfaces/admin.interfaces";
import formatDate from "@/utility/formatDate";

export const adminColumns: iTableColumns<iAdmin>[] = [
  {
    header: "Admin",
    accessor: (admin) => (
      <UserInfoCell name={admin.name} email={admin.email} avatar={admin.profilePhoto} />
    ),
  },
  {
    header: "Phone",
    accessor: ({ contactNumber }) => contactNumber,
  },
  {
    header: "Joined",
    accessor: ({ createdAt }) => formatDate(createdAt),
  },
  {
    header: "Status",
    accessor: ({ isDeleted }) => (
      <UserStatusCell status={isDeleted ? "DELETED" : "ACTIVE"} />
    ),
  },
];
