/**
 * ============================================================
 * OPCIÓN 3: ZUSTAND
 * ============================================================
 * Zustand es una solución minimalista de estado global.
 * Instala: npm install zustand
 *
 * VENTAJAS:
 *  - Sin Provider (se usa directamente en cualquier componente)
 *  - Muy poco boilerplate
 *  - Re-renders optimizados (solo re-renderiza lo que se suscribe)
 *  - Sencillo de aprender
 *
 * DESVENTAJAS:
 *  - Menos convenciones que Redux (puede ser inconsistente)
 *  - DevTools menos maduras
 *
 * USO EN App.tsx:
 *   ¡No necesita Provider! Solo importa el store en el componente:
 *   import { useCounterStore } from "./src/state/zustand/useCounterStore";
 * ============================================================
 */

import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementByAmount: (amount: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementByAmount: (amount) =>
    set((state) => ({ count: state.count + amount })),
}));
