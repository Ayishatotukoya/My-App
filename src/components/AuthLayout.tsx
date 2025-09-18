"use client";

import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  heroImage?: string;
  heroAlt?: string;
};

export function AuthLayout({
  children,
  darkMode,
  setDarkMode,
  heroImage = "/headerphoto.jpg",
  heroAlt = "Fashion showcase",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Image side */}
      <div className="relative hidden md:block">
        <img
          src={heroImage}
          alt={heroAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form side */}
      <div
        className={cn(
          "flex flex-col justify-center px-6 py-12 lg:px-16",
          darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
        )}
      >
        {/* Theme toggle in top-right */}
        <div className="absolute top-4 right-4">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <div className="w-full max-w-md mx-auto">{children}</div>
      </div>
    </div>
  );
}
