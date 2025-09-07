"use client";
import {
  createFileRoute,
  Link,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useVerifyEmail } from "@/lib/mutation";
import { authStore } from "@/stores/authstore";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/Auth/email")({
  component: VerifyEmail,
});

export default function VerifyEmail() {
  const darkMode = false;
  const { token } = useSearch();
  const verify = useVerifyEmail();
  const { setAuth } = authStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    verify
      .mutateAsync(token)
      .then((data) => {
        if (data?.user && data?.token)
          setAuth({ user: data.user, token: data.token });
        toast.success("Email verified!");
      })
      .catch((e: any) =>
        toast.error(e?.response?.data?.message ?? "Email verification failed")
      );
  }, [token]);

  if (!token) {
    return (
      <div className="p-6 text-center">
        <XCircle
          className={cn("mx-auto h-8 w-8", darkMode ? "text-red-400" : "text-red-600")}
        />
        <p className="mt-2 font-medium">Missing verification token.</p>
        <Link to="/Auth/signin" className="text-blue-600">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      {verify.isPending && (
        <>
          <Loader2 className="mx-auto h-6 w-6 animate-spin" />
          <p className="mt-2">Verifying your email…</p>
        </>
      )}
      {verify.isSuccess && (
        <>
          <CheckCircle2
            className={cn("mx-auto h-8 w-8", darkMode ? "text-green-400" : "text-green-600")}
          />
          <p className="mt-2 font-medium">Email verified!</p>
          <button
            onClick={() => router.navigate({ to: "/app/dashboard" })}
            className="text-blue-600 mt-2"
          >
            Go to App
          </button>
        </>
      )}
      {verify.isError && (
        <>
          <XCircle
            className={cn("mx-auto h-8 w-8",darkMode ? "text-red-400" : "text-red-600")}
          />
          <p className="mt-2 font-medium">Verification failed.</p>
          <Link to="/Auth/signin" className="text-blue-600">
            Back to Sign In
          </Link>
        </>
      )}
    </div>
  );
}
