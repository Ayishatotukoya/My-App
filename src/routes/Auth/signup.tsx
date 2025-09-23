"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
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
  const router = useRouter();

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

  const onSubmit = async (values: SignUpData) => {
    try {
      await signup.mutateAsync(values);
      toast.success("Sign up successful! Verification link sent.");
      router.navigate({ to: "/Auth/signin" });
      form.reset();
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Sign up failed");
    }
  };

  return (
    <AuthLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      heroImage="/headerphoto.jpg"
      heroAlt="Fashion hero"
    >
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign up</h2>
        <p
          className={cn(
            "text-sm text-center mb-6",
            darkMode ? "text-slate-100" : "text-gray-600"
          )}
        >
          Join us — discover new arrivals and enjoy quick checkout.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Create a password" {...field} />
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

            <Button
              disabled={signup.isPending}
              type="submit"
              className={cn(
                "w-full font-bold text-white",
                darkMode ? "bg-gray-600" : "bg-gray-800 "
              )}
            >
              {signup.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing up…
                </>
              ) : (
                "Sign up"
              )}
            </Button>

            {signup.isError && (
              <p className="text-red-500 text-sm mt-2">
                {signup.error?.message ?? "Sign up failed"}
              </p>
            )}
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          By creating an account you agree to our{" "}
          <Link to="/Auth/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>
         
          
        </div>

        <div className="mt-1 text-center text-sm">
          <span >Already have an account? </span>
          <Link to="/Auth/signin" className="text-blue-600 font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
