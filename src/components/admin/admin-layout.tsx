"use client";

import { useEffect, useState, useRef } from "react";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  List,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
  LogOut,
  X,
  Logs,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Link,
  Outlet /* optionally use useLocation */,
} from "@tanstack/react-router";
import { ThemeToggle } from "../ThemeToggle";


export default function AdminLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  // sidebar open state (controls both mobile overlay and desktop visibility)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // track whether viewport is mobile (< md)
  const [isMobile, setIsMobile] = useState(false);

  // admin footer collapse
  const [adminOpen, setAdminOpen] = useState(false);


  // ref to the first link in the sidebar for focus management (optional)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // handle resize -> set isMobile and ensure desktop default visible
  useEffect(() => {
    function onResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        // show sidebar on desktop by default
        setSidebarOpen(true);
      } else {
        // on mobile default closed
        setSidebarOpen(false);
      }
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // lock body scroll when mobile overlay is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
      // focus first link for accessibility
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  // close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && sidebarOpen && isMobile) {
        setSidebarOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen, isMobile]);

  // handle nav click: close overlay on mobile
  function handleNavClick() {
    if (isMobile) setSidebarOpen(false);
  }

  // Example nav items — feel free to move to a const above or import from a file
  const nav = [
    { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", to: "/admin/product", icon: ShoppingCart },
    { label: "Orders", to: "/admin/orders", icon: List },
    { label: "Settings", to: "/admin/settings", icon: Settings },
    { label: "Categories", to: "/admin/categories", icon: Logs },
  ];

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile backdrop (only visible on mobile when sidebarOpen) */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        aria-hidden={!sidebarOpen && isMobile}
        className={cn(
          "fixed inset-y-0 left-0 bg-gray-50 text-slate-950 w-64 p-4 transform transition-transform z-50",
          // mobile: toggle via translate-x; desktop: force visible with md:translate-x-0
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0" // on desktop always visible
        )}
      >
        {/* Header inside sidebar */}
        <div className="flex items-center justify-between mb-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200" />
            <div>Admin User</div>
          </div>

          {/* small close button for mobile */}
          {isMobile && (
            <button
              className="md:hidden rounded p-1"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X />
            </button>
          )}
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {nav.map((n, idx) => {
            const Icon = n.icon;
            return (
              <div
                key={n.label}
                className="mb-2 flex items-center gap-3 p-3 rounded hover:bg-slate-400 hover:text-white font-bold"
              >
                {Icon && <Icon />}
                {/* Using TanStack Link — we ensure mobile closes on click */}
                <Link
                  to={n.to}
                  onClick={() => {
                    handleNavClick();
                  }}
                  ref={idx === 0 ? firstLinkRef : undefined}
                  className="text-sm"
                >
                  {n.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Spacer pushes footer to the bottom */}
        <div className="flex-1" />

        {/* Sidebar footer: Admin collapsed area */}
        <div className="mt-6 border-t pt-3">
          <button
            className="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-md hover:bg-slate-50"
            onClick={() => setAdminOpen((s) => !s)}
            aria-expanded={adminOpen}
          >
            <div className="flex items-center gap-3">
              <User />
              <div>
                <div className="text-sm font-medium">Admin</div>
                <div className="text-xs text-slate-500">Administrator</div>
              </div>
            </div>
            <ChevronDown
              className={`h-4 w-4 transform transition-transform ${adminOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {adminOpen && (
            <div className="mt-2 flex flex-col gap-1">
              <Link
                to="/"
                onClick={handleNavClick}
                className="px-2 py-2 text-sm rounded hover:bg-slate-50"
              >
                Account
              </Link>
              <Link
                to="/admin/profile"
                onClick={handleNavClick}
                className="px-2 py-2 text-sm rounded hover:bg-slate-50"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                
                }}
                className="flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-slate-50 text-left"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-margin",
          isMobile ? "ml-0" : "md:ml-64"
        )}
      >
        {/* TopNav */}
        <header className="flex items-center justify-between px-4 py-2 border-b bg-white">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              <Menu />
            </button>

            {/* logo */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-slate-200 flex items-center justify-center font-bold">
                <img src="./logo512.png" alt="logo" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* search */}
            <div className="relative ">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search products, orders..."
                className="w-64 rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring"
              />
            </div>

            {/* notification */}
            <button
              className="rounded-md p-2 hover:bg-slate-100"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}

            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>

        </header>

        {/* Page content */}
        <main className="flex-1 p-4 bg-slate-100 min-h-0 overflow-auto">
          {children || <Outlet />}
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-sm bg-white border-t">
          &copy; 2025 My E-commerce Admin. About • Features • Contact
        </footer>
      </div>
    </div>
  );
}
