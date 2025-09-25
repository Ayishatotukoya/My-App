
"use client";

import { createFileRoute, useRouter } from "@tanstack/react-router";
import { authStore } from "@/stores/authstore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({ component: Dashboard });

function Dashboard() {
  const { logout } = authStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/admin/admin" }); 
  };
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen p-6 transition-colors",
        darkMode ? "bg-slate-900 text-slate-100" : "bg-gray-50 text-gray-800"
      )}
    >
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Welcome to{" "}
          <span className="text-blue-600">MyApp</span>
        </h1>
        <p
          className={cn(
            "text-lg mb-8",
            darkMode ? "text-slate-300" : "text-gray-600"
          )}
        >
          A modern authentication starter built with{" "}
          <span className="font-semibold">
            React, Zod, RHF & TanStack Router
          </span>
          .
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleLogout}
            size="lg"
            className={cn(
              "px-8 text-white",
              darkMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
