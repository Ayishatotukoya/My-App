"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = React.ComponentProps<typeof Input> & {
  darkMode?: boolean;
};

export function PasswordInput({
  darkMode = false,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        {...props}
        className={cn(
          "pr-10",
          darkMode ? "border-gray-700 shadow-neutral-900 shadow-md" : ""
        )}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? "Hide password" : "Show password"}
        className={cn(
          "absolute inset-y-0 right-3 flex items-center",
          darkMode ? "text-gray-400" : "text-gray-700"
        )}
      >
        {visible ? <Eye /> : <EyeOff />}
      </button>
    </div>
  );
}
