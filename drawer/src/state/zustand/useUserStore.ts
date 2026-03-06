import { create } from "zustand";

export interface User {
  name: string;
  email: string;
}

interface UserState {
  user: User;
  updateUser: (data: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: "Usuario Demo",
    email: "demo@correo.com",
  },
  updateUser: (data) =>
    set((state) => ({
      user: { ...state.user, ...data },
    })),
}));
