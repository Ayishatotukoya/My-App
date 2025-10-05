"use client";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { authStore } from "@/stores/authstore";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const { token } = authStore.getState();
    if (token) {
      // already logged in → go to dashboard
      throw redirect({ to: "/app" });
    } else {
      // not logged in → go to signin
      throw redirect({ to: "/admin/admin" });
    }
  },
  component: () => null,
});
