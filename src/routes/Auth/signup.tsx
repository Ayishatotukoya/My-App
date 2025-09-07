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
import { type SignUpData, signUpSchema } from "@/components/schema";
import { House, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignup } from "@/lib/mutation";
import { toast } from "sonner";


export const Route = createFileRoute('/Auth/signup')({
  component: SignUp,
})

export function SignUp() {

   const [darkMode, setDarkMode] = useState(false)


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
       toast.success(
         "Sign up successful! verification link sent."
       );
      router.navigate({ to: "/Auth/signin" });
       form.reset();
     } catch (e: any) {
       toast.error(e?.response?.data?.message ?? "Sign up failed");
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
              "absolute left-2 top-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700"
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
            Sign Up
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* first-name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First-Name</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          darkMode
                            ? "border-gray-700 shadow-md shadow-neutral-900 "
                            : ""
                        )}
                        placeholder="Enter your first-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* last-name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last-Name</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          darkMode
                            ? "border-gray-700 shadow-md shadow-neutral-900 "
                            : ""
                        )}
                        placeholder="Enter your last-name"
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

              {/* Submit button */}
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                    up…
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
          </Form>

        </CardContent>

        <CardFooter className="text-center flex flex-col gap-2">
          <p className="text-center text-[14px]">or sign up with</p>
          <div className="flex items-center justify-center gap-2">
            <img src="/Google.svg" alt="google icon" />
            <img src="/Facebook.svg" alt="facebook icon" />
          </div>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/Auth/signin" className="text-blue-600 font-semibold">
              Sign In
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );

}
