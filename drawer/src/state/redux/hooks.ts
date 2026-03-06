/**
 * Hooks tipados para usar Redux en componentes.
 * Úsalos en lugar de useDispatch y useSelector directamente.
 *
 * Ejemplo:
 *   const count = useAppSelector((state) => state.counter.count);
 *   const dispatch = useAppDispatch();
 *   dispatch(increment());
 */

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
