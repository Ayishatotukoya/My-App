import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setAuth: (payload: { user: User; token: string }) => void;
  setLoading: (v: boolean) => void;
  setError: (v: string | null) => void;
  logout: () => void;
};

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      setAuth: ({ user, token }) => set({ user, token, error: null }),
      setLoading: (v) => set({ loading: v }),
      setError: (v) => set({ error: v }),
      logout: () => set({ user: null, token: null, error: null }),
    }),
    { name: "auth-state" }
  )
);
