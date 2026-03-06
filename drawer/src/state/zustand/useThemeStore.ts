import { create } from "zustand";

type Theme = "light" | "dark";

interface Colors {
  background: string;
  text: string;
  primary: string;
  card: string;
  border: string;
}

const lightColors: Colors = {
  background: "#ffffff",
  text: "#1e293b",
  primary: "#0f766e",
  card: "#f1f5f9",
  border: "#e2e8f0",
};

const darkColors: Colors = {
  background: "#0f172a",
  text: "#f1f5f9",
  primary: "#14b8a6",
  card: "#1e293b",
  border: "#334155",
};

interface ThemeState {
  theme: Theme;
  colors: Colors;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  colors: lightColors,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
      colors: state.theme === "light" ? darkColors : lightColors,
    })),
}));
