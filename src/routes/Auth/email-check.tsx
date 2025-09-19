"use client";

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForgotPassword } from "@/lib/mutation";
import { AuthLayout } from "@/components/AuthLayout";
import { resendSchema, type ResendData } from "@/components/schema";



export const Route = createFileRoute("/Auth/email-check")({
  component: CheckEmail,
});

export default function CheckEmail() {
  const [darkMode, setDarkMode] = useState(false);
  const form = useForm<ResendData>({
    resolver: zodResolver(resendSchema),
    defaultValues: { email: "" },
  });

  const resend = useForgotPassword();

  const onResend = async (values: ResendData) => {
    try {
      await resend.mutateAsync(values);
      toast.success("If an account exists, a reset link was (re)sent.");
      form.reset();
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Failed to resend link");
    }
  };

  return (
    <AuthLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      heroImage="/auth-hero.jpg"
    >
      <div className="max-w-md w-full mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Check your email</h2>
        <p className="text-sm text-gray-700 dark:text-slate-300 mb-6">
          We’ve sent a link to reset your password (if an account exists). The
          link will expire in about 60 minutes. Check your inbox and spam
          folder.
        </p>

        <div className="mb-4">
          <Link to="/Auth/signin" className="text-blue-600 font-medium">
            Back to Sign In
          </Link>
        </div>

        <div className="text-sm text-gray-700 dark:text-slate-300 mb-3">
          Didn't receive the email? Resend link
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onResend)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                disabled={resend.isPending}
                type="submit"
                className="w-full"
              >
                {resend.isPending ? "Resending…" : "Resend email"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
