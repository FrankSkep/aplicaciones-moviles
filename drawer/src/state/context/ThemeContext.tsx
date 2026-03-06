/**
 * ============================================================
 * OPCIÓN 1: CONTEXT API
 * ============================================================
 * Context API es la solución nativa de React para estado global.
 * No requiere librerías externas.
 *
 * VENTAJAS:
 *  - Sin dependencias adicionales
 *  - Simple para proyectos pequeños/medianos
 *  - Oficial de React
 *
 * DESVENTAJAS:
 *  - Re-renders no optimizados (todo el árbol re-renderiza)
 *  - Puede volverse complejo en apps grandes
 * ============================================================
 */

import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface Colors {
  background: string;
  text: string;
  primary: string;
  card: string;
  border: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
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

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  }
  return context;
}
