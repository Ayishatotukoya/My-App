"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { PasswordInput } from "@/components/passwordinput";
import { type SignInData, signInSchema } from "@/components/schema";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignin } from "@/lib/mutation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { authStore } from "@/stores/authstore";

export const Route = createFileRoute("/Auth/signin")({
  component: SignIn,
});

export function SignIn() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signin = useSignin();
  const { setAuth } = authStore();

  const onSubmit = async (v: SignInData) => {
    try {
      const data = await signin.mutateAsync(v);
      setAuth({ user: data.user, token: data.token });
      toast.success("Welcome back!");
      router.navigate({ to: "/app/dashboard" });
      form.reset();
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Sign in failed");
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      footer={
        <>
          <p className="text-center text-[14px]">or sign in with</p>
          <div className="flex flex-wrap justify-center gap-3">
            <img src="/Google.svg" alt="google" />
            <img src="/Facebook.svg" alt="facebook" />
            <img src="/Fingerprint.svg" alt="fingerprint" />
          </div>
          <p className="text-center text-[14px]">
            Don’t have an account?{" "}
            <Link to="/Auth/signup" className="text-blue-600 font-bold">
              Sign Up
            </Link>
          </p>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      darkMode
                        ? "border-gray-700 shadow-md shadow-neutral-900"
                        : ""
                    )}
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="**********"
                    darkMode={darkMode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button
            disabled={signin.isPending}
            type="submit"
            className={cn(
              "w-full",
              darkMode
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            {signin.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          {signin.isError && (
            <p className="text-red-500 text-sm mt-2">
              {signin.error?.message ?? "Sign in failed"}
            </p>
          )}
        </form>
      </Form>

      <div className="text-right mt-2">
          Forgot password?
      </div>
    </AuthLayout>
  );
}
