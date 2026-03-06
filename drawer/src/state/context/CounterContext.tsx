import React, { createContext, useContext, useState, ReactNode } from "react";

interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementByAmount: (amount: number) => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export function CounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);
  const incrementByAmount = (amount: number) =>
    setCount((prev) => prev + amount);

  return (
    <CounterContext.Provider
      value={{ count, increment, decrement, reset, incrementByAmount }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter(): CounterContextType {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter debe usarse dentro de <CounterProvider>");
  }
  return context;
}
