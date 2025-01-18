import { create } from "zustand";

type Store = {
  isAuth: boolean;
  token: string | null;
  user: any | null;
  setSession: (token: string, user: any) => void;
  logout: () => void;
};

export const useAuthStore = create<Store>()((set) => ({
  isAuth: false,
  token: null,
  user: null,
  setSession: (token, user) => set({ isAuth: true, token, user }),
  logout: () => set({ isAuth: false, token: null, user: null }),
}));
