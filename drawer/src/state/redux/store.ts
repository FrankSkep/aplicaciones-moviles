/**
 * ============================================================
 * OPCIÓN 2: REDUX TOOLKIT
 * ============================================================
 * Redux Toolkit es la forma oficial y moderna de usar Redux.
 * Instala: npm install @reduxjs/toolkit react-redux
 *
 * VENTAJAS:
 *  - Ideal para apps grandes y complejas
 *  - DevTools para depuración en tiempo real
 *  - Immutabilidad garantizada con Immer
 *  - Soporte para async con createAsyncThunk
 *
 * DESVENTAJAS:
 *  - Mayor cantidad de boilerplate
 *  - Curva de aprendizaje más pronunciada
 *
 * USO EN App.tsx:
 *   import { Provider } from "react-redux";
 *   import { store } from "./src/state/redux/store";
 *
 *   <Provider store={store}>
 *     <NavigationContainer>...</NavigationContainer>
 *   </Provider>
 * ============================================================
 */

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
