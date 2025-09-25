"use client";

import { Outlet, createFileRoute } from "@tanstack/react-router";
import AdminLayout from "@/components/admin/admin-layout";

export const Route = createFileRoute("/admin/admin")({
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
