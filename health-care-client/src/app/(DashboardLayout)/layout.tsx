"use client";

import AppSidebar from "@/components/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { iChildren } from "@/interfaces";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardLayout({ children }: Readonly<iChildren>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <main className="px-4 w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
