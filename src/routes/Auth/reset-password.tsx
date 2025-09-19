"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFileRoute,
  Link,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/passwordinput";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useResetPassword } from "@/lib/mutation";
import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "@/components/schema";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/Auth/reset-password")({
  component: ResetPassword,
});

export default function ResetPassword() {
  const [darkMode, setDarkMode] = useState(false);
  const  token  = useSearch({ from: Route.id });
  const router = useRouter();

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const reset = useResetPassword();

  const onSubmit = async (values: ResetPasswordData) => {
    if (!token) {
      toast.error("Missing reset token.");
      return;
    }

    try {
      await reset.mutateAsync({ token: "token", newPassword: values.password });
      toast.success("Password reset! Please sign in with your new password.");
      router.navigate({ to: "/Auth/signin" });
      form.reset();
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Could not reset password");
    }
  };

  if (!token) {
    return (
      <AuthLayout
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        heroImage="/auth-hero.jpg"
      >
        <div className="max-w-md w-full mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid or missing link</h2>
          <p className="mb-6 text-sm text-gray-700 dark:text-slate-300">
            This reset link is missing or invalid. You can request a new link.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/Auth/forgot-password" className="text-blue-600">
              Request a new link
            </Link>
            <Link to="/Auth/signin" className="text-gray-600">
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      heroImage="/headerphoto.jpg"
    >
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">Reset password</h2>
        <p className="text-sm text-center mb-6 text-gray-700 dark:text-slate-300">
          Enter a new password below.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="New password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={reset.isPending} type="submit" className="w-full">
              {reset.isPending ? "Resetting…" : "Reset password"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <Link to="/Auth/signin" className="text-blue-600">
            Back to Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
