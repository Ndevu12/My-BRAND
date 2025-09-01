import React from "react";
import DashboardLayout from "@/features/dashboard/dashboardLayout/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
