import { api } from "@/features/Api";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  return useMutation({
    mutationFn: async (body: {
      email: string;
      password: string;
    }) => {
      const { data } = await api.post("/signup", body);
       return data;
    },
  });
}

export function useSignin() {
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const { data } = await api.post("/signin", body);
      return data;
    },
  });
}
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (body:{email: string}) => {
      const { data } = await api.post("/forgot-password", body);
      return data;
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async(body: { token: string; newPassword: string }) => {
      const { data } = await api.post("/reset-password", body);
      return data;
    }   
  })
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (token: string) => {
      const { data } = await api.post("/verify-email", { token });
      return data;
    },
  });
}

