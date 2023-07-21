import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
let timeout: NodeJS.Timeout;
const useDebounce = (callback: (arg?: any) => any, wait = 500) => {
  const DebouncedFunc = () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, wait);
  };
  return DebouncedFunc;
};

export default useDebounce;
