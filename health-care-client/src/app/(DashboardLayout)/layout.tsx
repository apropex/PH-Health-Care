import AppSidebar from "@/components/dashboard/AppSidebar";
import SidebarNavbar from "@/components/dashboard/SidebarNavbar";
import ResetPasswordNotification from "@/components/ResetPasswordNotification";
import { SidebarProvider } from "@/components/ui/sidebar";
import { iChildren } from "@/interfaces";
import { getCookie } from "@/proxy-utils/cookie";

export default async function DashboardLayout({ children }: Readonly<iChildren>) {
  const defaultOpen = (await getCookie("sidebar_state")) === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <ResetPasswordNotification />
        <SidebarNavbar />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
