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
import { type SignUpData, signUpSchema } from "@/components/schema";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignup } from "@/lib/mutation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/Auth/signup")({
  component: SignUp,
});

export function SignUp() {
  const [darkMode, setDarkMode] = useState(false);
  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signup = useSignup();
  const router = useRouter();

  const onSubmit = async (v: SignUpData) => {
    try {
      await signup.mutateAsync(v);
      toast.success("Sign up successful! Verification link sent.");
      router.navigate({ to: "/Auth/signin" });
      form.reset();
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Sign up failed");
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      footer={
        <>
          <p className="text-center text-[14px]">or sign up with</p>
          <div className="flex flex-wrap justify-center gap-3">
            <img src="/Google.svg" alt="google" />
            <img src="/Facebook.svg" alt="facebook" />
          </div>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/Auth/signin" className="text-blue-600 font-semibold">
              Sign In
            </Link>
          </span>
        </>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      darkMode
                        ? "border-gray-700 shadow-md shadow-neutral-900"
                        : ""
                    )}
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      darkMode
                        ? "border-gray-700 shadow-md shadow-neutral-900"
                        : ""
                    )}
                    placeholder="Enter your last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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

          {/* Submit */}
          <Button
            disabled={signup.isPending}
            type="submit"
            className={cn(
              "w-full",
              darkMode
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            {signup.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing up…
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          {signup.isError && (
            <p className="text-red-500 text-sm mt-2">
              {signup.error?.message ?? "Sign up failed"}
            </p>
          )}
        </form>
      </Form>
    </AuthLayout>
  );
}
