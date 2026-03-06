import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface Colors {
  background: string;
  text: string;
  primary: string;
  card: string;
  border: string;
}

interface ThemeState {
  theme: Theme;
  colors: Colors;
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

const initialState: ThemeState = {
  theme: "light",
  colors: lightColors,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      state.colors = state.theme === "light" ? lightColors : darkColors;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
