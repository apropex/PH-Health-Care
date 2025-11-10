import { tUserRole, UserRole } from "@/constants";
import { Home } from "lucide-react";
import { ElementType } from "react";

interface Item {
  title: string;
  url: string;
  icon: ElementType;
}

interface iSidebarMenu {
  group?: {
    title: string;
    items: Item[];
  }[];
  items?: Item[];
}

const ADMIN: iSidebarMenu = {
  group: [
    {
      title: "Management",
      items: [
        {
          title: "Mange Doctors",
          url: "/admin/dashboard/manage-doctors",
          icon: Home,
        },
        {
          title: "Manage Patients",
          url: "/admin/dashboard/manage-patients",
          icon: Home,
        },
      ],
    },
    {
      title: "Protected",
      items: [
        {
          title: "Mange Doctors",
          url: "/admin/dashboard/manage-doctors",
          icon: Home,
        },
        {
          title: "Manage Patients",
          url: "/admin/dashboard/manage-patients",
          icon: Home,
        },
      ],
    },
  ],

  items: [
    {
      title: "Analytics",
      url: "/admin/dashboard",
      icon: Home,
    },

    {
      title: "Calendar",
      url: "#",
      icon: Home,
    },
  ],
};
const DOCTOR: iSidebarMenu = {
  group: [
    {
      title: "Management",
      items: [
        {
          title: "Mange Doctors",
          url: "/admin/dashboard/manage-doctors",
          icon: Home,
        },
        {
          title: "Manage Patients",
          url: "/admin/dashboard/manage-patients",
          icon: Home,
        },
      ],
    },
  ],

  items: [
    {
      title: "Analytics",
      url: "/admin/dashboard",
      icon: Home,
    },

    {
      title: "Calendar",
      url: "#",
      icon: Home,
    },
  ],
};
const PATIENT: iSidebarMenu = {
  group: [
    {
      title: "Management",
      items: [
        {
          title: "Mange Doctors",
          url: "/admin/dashboard/manage-doctors",
          icon: Home,
        },
        {
          title: "Manage Patients",
          url: "/admin/dashboard/manage-patients",
          icon: Home,
        },
      ],
    },
  ],

  items: [
    {
      title: "Analytics",
      url: "/admin/dashboard",
      icon: Home,
    },

    {
      title: "Calendar",
      url: "#",
      icon: Home,
    },
  ],
};

export default function SidebarRoutes(ROLE: tUserRole): iSidebarMenu {
  switch (ROLE) {
    case UserRole.ADMIN:
      return ADMIN;
    case UserRole.PATIENT:
      return PATIENT;
    case UserRole.DOCTOR:
      return DOCTOR;
    default:
      return {};
  }
}
