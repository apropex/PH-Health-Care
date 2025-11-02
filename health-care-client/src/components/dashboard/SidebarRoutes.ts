import { tUserRole, UserRole } from "@/constants";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

const ADMIN = [
  {
    title: "Analytics",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Mange Doctors",
    url: "/dashboard/admin/manage-doctors",
    icon: Home,
  },
  {
    title: "Manage Patients",
    url: "/dashboard/admin/manage-patients",
    icon: Home,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Home,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const PATIENT = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const DOCTOR = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function SidebarRoutes(ROLE: tUserRole) {
  switch (ROLE) {
    case UserRole.ADMIN:
      return ADMIN;
    case UserRole.PATIENT:
      return PATIENT;
    case UserRole.DOCTOR:
      return DOCTOR;
    default:
      return [];
  }
}
