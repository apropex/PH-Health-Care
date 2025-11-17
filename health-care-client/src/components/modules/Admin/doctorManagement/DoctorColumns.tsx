import { iTableColumns } from "@/components/shared/ManagementTable";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import Image from "next/image";

export const doctorColumns: iTableColumns<iDoctor>[] = [
  {
    header: "Avatar",
    accessor: (doctor) => (
      <Image
        src={doctor.profilePhoto}
        alt={doctor.name}
        width={40}
        height={40}
        className="object-cover rounded-full"
      />
    ),
  },
  {
    header: "Name",
    accessor: ({ name }) => name,
  },
  {
    header: "Gender",
    accessor: ({ gender }) => gender,
  },
  {
    header: "Email",
    accessor: ({ email }) => email,
  },
  {
    header: "Phone",
    accessor: ({ contactNumber }) => contactNumber,
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
    header: "REG. No.",
    accessor: ({ appointmentFee }) => appointmentFee,
  },
];
