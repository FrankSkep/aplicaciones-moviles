import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User;
  updateUser: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: "Usuario Demo",
    email: "demo@correo.com",
  });

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de <UserProvider>");
  }
  return context;
}
