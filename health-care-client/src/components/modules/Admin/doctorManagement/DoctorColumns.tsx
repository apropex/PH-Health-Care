import CustomCollapsible from "@/components/CustomCollapsible";
import { iTableColumns } from "@/components/shared/ManagementTable";
import UserInfoCell from "@/components/shared/UserInfoCell";
import UserStatusCell from "@/components/shared/UserStatusCell";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import formatDate from "@/utility/formatDate";
import join from "@/utility/joinText";
import { Star } from "lucide-react";

export const doctorColumns: iTableColumns<iDoctor>[] = [
  {
    header: "Doctor",
    accessor: (doctor) => (
      <UserInfoCell
        name={doctor.name}
        email={doctor.email}
        avatar={doctor.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Designation",
    accessor: (doctor) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{doctor.designation}</span>
        <span className="text-xs text-foreground/70">{doctor.qualification}</span>
      </div>
    ),
  },
  {
    header: "Specialties",
    accessor: (doctor) => (
      <CustomCollapsible
        itemClass="border-0 border-t rounded-none px-1.5 py-1"
        buttonTitle="Specialties"
        items={
          doctor.doctorSpecialties?.map(({ specialties }) => specialties.title) || []
        }
      />
    ),
  },
  {
    header: "REG. No.",
    accessor: ({ registrationNumber }) => registrationNumber,
  },
  {
    header: "Experience",
    accessor: ({ experience: e }) => (e > 0 ? `${e} Years` : `${e} Year`),
  },
  {
    header: "Fee",
    accessor: ({ appointmentFee }) => join(appointmentFee, " /-"),
    sortKey: "appointmentFee",
  },
  {
    header: "Ratting",
    accessor: ({ averageRating }) => (
      <div className="flex items-center gap-1">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium inline-block mt-0.5">
          {(averageRating || 0).toFixed(1)}
        </span>
      </div>
    ),
    sortKey: "averageRating",
  },
  {
    header: "Joined",
    accessor: ({ createdAt }) => formatDate(createdAt),
    sortKey: "createdAt",
  },
  {
    header: "Status",
    accessor: ({ isDeleted }) => (
      <UserStatusCell status={isDeleted ? "DELETED" : "ACTIVE"} />
    ),
  },
];
