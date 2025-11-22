import { iTableColumns } from "@/components/shared/ManagementTable";
import { iSpecialty } from "@/interfaces/doctor.interfaces";
import Image from "next/image";

export const specialtyColumns: iTableColumns<iSpecialty>[] = [
  {
    header: "Icon",
    accessor: (specialty) => (
      <Image
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC..."
        src={specialty.icon}
        alt={specialty.title}
        width={40}
        height={40}
        className="object-cover rounded-full"
      />
    ),
  },
  {
    header: "Title",
    accessor: (specialty) => specialty.title,
  },
];
