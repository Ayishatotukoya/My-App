"use client";
import {type ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { House } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  footer?: ReactNode;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
};

export function AuthLayout({
  children,
  title,
  footer,
  darkMode,
  setDarkMode,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center min-h-screen p-4",
        darkMode ? "bg-slate-900" : "bg-[#F9FAFB]"
      )}
    >
      <Card
        className={cn(
          "w-full max-w-md shadow-2xl relative border-none sm:max-w-md md:max-w-lg lg:max-w-xl",
          darkMode
            ? "bg-[#1E293B] text-[#CBD5E1]"
            : "bg-white text-[#4B5563] border border-gray-200"
        )}
      >
        {/* Theme Toggle */}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Header */}
        <CardHeader>
          <Link
            to="/"
            className="absolute left-2 top-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700"
          >
            <House className="w-5 h-5" />
          </Link>
          <CardTitle
            className={cn(
              "text-2xl font-bold text-center",
              darkMode ? "text-[#F8FAFC]" : "text-neutral-700"
            )}
          >
            {title}
          </CardTitle>
        </CardHeader>

        {/* Form */}
        <CardContent>{children}</CardContent>

        {/* Footer */}
        {footer && (
          <CardFooter className="flex flex-col gap-2">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
}
