import AppSidebar from "@/components/dashboard/AppSidebar";
import SidebarNavbar from "@/components/dashboard/SidebarNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { iChildren } from "@/interfaces";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: Readonly<iChildren>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <SidebarNavbar />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
