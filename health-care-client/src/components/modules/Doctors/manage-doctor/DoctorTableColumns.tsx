"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import RowActions from "./DoctorTableRowAction";

export const columns: ColumnDef<iDoctor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profilePhoto",
    header: " ",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Image
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC..."
          src={row.getValue("profilePhoto")}
          alt="DP"
          width={36}
          height={36}
          className="object-cover rounded-[9px]"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div className="capitalize">{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          className="cursor-pointer flex items-center gap-x-1.5"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "contactNumber",
    header: "Phone",
  },
  {
    accessorKey: "qualification",
    header: "Qualification",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "experience",
    header: () => <div className="text-center">Experience</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("experience")}</div>,
  },
  {
    accessorKey: "appointmentFee",
    header: () => <div className="text-right">Fee</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("appointmentFee"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    size: 60,
    cell: ({ row }) => <RowActions row={row} />,
  },
];
