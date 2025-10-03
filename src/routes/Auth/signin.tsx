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
import { useSignin } from "@/lib/mutation";
import { authStore } from "@/stores/authstore";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { cn } from "@/lib/utils";

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
    <AuthLayout darkMode={darkMode} setDarkMode={setDarkMode}>
      <h2
        className={cn(
          "text-3xl font-bold mb-6 text-center",
          darkMode ? "text-[#F8FAFC]" : "text-neutral-700"
        )}
      >
        Sign In
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <PasswordInput
                    placeholder="********"
                    darkMode={darkMode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center text-sm">
            <Link to="/Auth/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            disabled={signin.isPending}
            type="submit"
            className={cn(
              "w-full font-bold text-white",
              darkMode ? "bg-gray-600 " : "bg-gray-800 "
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
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Don’t have an account?{" "}
          <Link to="/Auth/signup" className="text-blue-600 font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

