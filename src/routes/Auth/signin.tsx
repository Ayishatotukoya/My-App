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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';
import { PasswordInput } from "@/components/passwordinput";
import { type SignInData, signInSchema } from "@/components/schema";
import { House, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignin } from "@/lib/mutation";
import { authStore } from "@/stores/authstore";
import { toast } from "sonner";

export const Route = createFileRoute('/Auth/signin')({
  component: SignIn,
})

export function SignIn() {

   const [darkMode, setDarkMode] = useState(false)
   const router = useRouter();

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
    <div
      className={cn(
        "flex justify-center items-center min-h-screen p-4",
        darkMode ? "bg-slate-900" : "bg-[#F9FAFB]"
      )}
    >
      <Card
        className={cn(
          "w-full max-w-md shadow-2xl relative border-none",
          "sm:max-w-md md:max-w-lg lg:max-w-xl",
          darkMode
            ? "bg-[#1E293B] text-[#CBD5E1]"
            : "bg-white text-[#4B5563] border border-gray-200"
        )}
      >
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <CardHeader>
          <Link
            to="/"
            className={cn(
              "absolute left-2 top-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700"
            )}
          >
            <House className="w-5 h-5" />
          </Link>

          <CardTitle
            className={cn(
              "text-2xl font-bold text-center",
              darkMode ? "text-[#F8FAFC]" : "text-neutral-700"
            )}
          >
            Sign In
          </CardTitle>
        </CardHeader>

        <CardContent>
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
                            ? "border-gray-700 shadow-md shadow-neutral-900 "
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                    in…
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-right mt-2">Forgot password?</div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-center text-[14px]">or sign in with</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <img src="/Google.svg" alt="google" className="w-8 h-8" />
            <img src="/Facebook.svg" alt="facebook" className="w-8 h-8" />
            <img src="/Fingerprint.svg" alt="fingerprint" className="w-8 h-8" />
          </div>
          <p className="text-center text-[14px]">
            Don’t have an account?{" "}
            <span className="text-blue-600 text-[14px] font-bold">
              <Link to="/Auth/signup">Sign Up</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );

}
