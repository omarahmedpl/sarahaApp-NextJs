import { create } from "zustand";

type Store = {
  isAuth: boolean;
  token: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
