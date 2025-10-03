"use client";

import { createFileRoute, Outlet } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/admin-layout";

export const Route = createFileRoute("/admin/dashboard")({
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
