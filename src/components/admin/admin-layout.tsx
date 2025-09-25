// src/components/admin/AdminLayout.tsx
"use client";

import { useState } from "react";
// import { Link, Outlet } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { authStore } from "@/stores/authstore";
import { Outlet } from "@tanstack/react-router";

export default function AdminLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = authStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 bg-slate-800 text-white w-64 p-4 transform transition-transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <li>Dashboard</li>
          <li>All Products</li>
          <li>Categories</li>
          <li>Settings</li>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* TopNav */}
        <header className="flex items-center justify-between px-4 py-2 border-b bg-white">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>
          <div className="flex-1 text-center">Search Bar (later)</div>
          <div className="ml-auto">
            {user?.firstName} ▼
            {/* Here you can add dropdown for Profile/Logout */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 bg-gray-50">{children || <Outlet />}
        
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-sm bg-white border-t">
          &copy; 2025 My E-commerce Admin. About • Features • Contact
        </footer>
      </div>
    </div>
  );
}
