"use client";
import { authStore } from "@/stores/authstore";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard")(
  {
  beforeLoad: () => {
    const { token } = authStore.getState();
    if (!token) throw redirect({ to: "/Auth/signin", search: { r: "/app" } });
  },
  component: () => (
    <div className="min-h-screen p-4">
      <Outlet />
    </div>
  ),
});
