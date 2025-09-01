"use client";

import React from "react";
import DashboardLayout from "@/features/dashboard/dashboardLayout/DashboardLayout";
import AuthGuard from "@/components/auth/AuthGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
