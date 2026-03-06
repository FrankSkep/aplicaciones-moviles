# Estado Global en React Native

En este proyecto se implementan las tres formas más comunes de manejar estado global en React Native. Cada vista usa una solución distinta.

---

## Distribución por vista

| Vista | Solución | Estado que maneja |
|---|---|---|
| `Home` | Redux Toolkit | Contador (+/−/reset) |
| `Profile` | Zustand | Usuario y contador |
| `Settings` | Context API | Tema claro/oscuro |

---

## Estructura de archivos

```
src/state/
├── context/                  ← Context API
│   ├── ThemeContext.tsx       useTheme()
│   ├── CounterContext.tsx     useCounter()
│   ├── UserContext.tsx        useUser()
│   └── AppProvider.tsx        Provider combinado
│
├── redux/                    ← Redux Toolkit
│   ├── store.ts               configureStore()
│   ├── hooks.ts               useAppDispatch / useAppSelector
│   └── slices/
│       ├── counterSlice.ts
│       ├── themeSlice.ts
│       └── userSlice.ts
│
└── zustand/                  ← Zustand
    ├── useCounterStore.ts
    ├── useThemeStore.ts
    └── useUserStore.ts
```

---

## Explicación de cada solución

### 1. Context API

Es la solución nativa de React. No requiere instalar ninguna librería adicional. Funciona creando un contexto con `createContext`, un `Provider` que envuelve a los componentes hijos, y un hook personalizado que expone el estado con `useContext`.

**Cómo funciona:**
1. Se crea un contexto con un valor inicial.
2. El `Provider` se coloca en la raíz de la app (o donde se necesite).
3. Cualquier componente hijo puede leer y modificar el estado con el hook.

```tsx
// Definición
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Uso en un componente
const { theme, setTheme } = useTheme();
```

**Cuándo usarlo:** Proyectos pequeños o medianos, datos que cambian poco (tema, idioma, usuario autenticado).

---

### 2. Redux Toolkit

Es la forma oficial y moderna de usar Redux. Centraliza todo el estado de la app en un único `store`. El estado se divide en `slices`, cada uno con su propio estado inicial y sus `reducers` (funciones puras que describen cómo cambia el estado). Los componentes leen el estado con `useSelector` y envían acciones con `useDispatch`.

**Cómo funciona:**
1. Se crea un `slice` con `createSlice` (estado + reducers en un solo lugar).
2. Se registra el slice en el `store` con `configureStore`.
3. Se envuelve la app con `<Provider store={store}>`.
4. Los componentes acceden al estado con `useAppSelector` y lo modifican con `useAppDispatch` + una acción.

```tsx
// Slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; },
  },
});

// Store
export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

// Uso en un componente
const count = useAppSelector((s) => s.counter.count);
const dispatch = useAppDispatch();
dispatch(increment());
```

**Cuándo usarlo:** Apps grandes con estado complejo, múltiples desarrolladores, necesidad de historial de cambios (Redux DevTools) o lógica asíncrona avanzada con `createAsyncThunk`.

---

### 3. Zustand

Es una librería minimalista de estado global. No necesita Provider ni boilerplate. Se define un store como un hook de React con `create`, que contiene tanto el estado como las funciones que lo modifican. Cualquier componente puede suscribirse directamente importando ese hook.

**Cómo funciona:**
1. Se crea el store con `create`, definiendo el estado y las funciones dentro del mismo objeto.
2. Se importa el hook en cualquier componente sin necesidad de Provider.
3. Zustand re-renderiza únicamente los componentes que consumen la parte del estado que cambió.

```tsx
// Store
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Uso en un componente (sin Provider, se importa directo)
const { count, increment, decrement } = useCounterStore();
```

**Cuándo usarlo:** Proyectos de cualquier tamaño que buscan simplicidad. Ideal cuando Redux se siente excesivo pero Context API queda corto.

---

## Comparativa rápida

| Característica | Context API | Redux Toolkit | Zustand |
|---|---|---|---|
| Instalación extra | No | `@reduxjs/toolkit react-redux` | `zustand` |
| Requiere Provider | Sí | Sí (`<Provider>`) | No |
| Boilerplate | Medio | Alto | Mínimo |
| Re-renders | No optimizados | Optimizados | Optimizados |
| DevTools | No | Sí (Redux DevTools) | Sí (básico) |
| Curva de aprendizaje | Baja | Alta | Baja |
| Ideal para | Apps pequeñas | Apps grandes/complejas | Cualquier tamaño |
| Async nativo | No (useEffect) | Sí (`createAsyncThunk`) | Sí (función async normal) |