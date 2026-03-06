/**
 * AppProvider combina todos los contextos en un solo componente.
 * Úsalo para envolver la raíz de tu aplicación en App.tsx:
 *
 *   <AppProvider>
 *     <NavigationContainer>...</NavigationContainer>
 *   </AppProvider>
 */

import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { CounterProvider } from "./CounterContext";
import { UserProvider } from "./UserContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CounterProvider>
        <UserProvider>{children}</UserProvider>
      </CounterProvider>
    </ThemeProvider>
  );
}
