import { api } from "@/features/Api";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  return useMutation({
    mutationFn: async (body: {
      email: string;
      password: string;
    }) => {
      const { data } = await api.post("https://reqres.in/api/signup", body);
       return data;
    },
  });
}

export function useSignin() {
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const { data } = await api.post("https://reqres.in/api/signin", body);
      return data;
    },
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (token: string) => {
      const { data } = await api.post("https://reqres.in/api/verify-email", { token });
      return data;
    },
  });
}
