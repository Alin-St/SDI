import { createContext, useContext } from "react";

export const ToastContext = createContext((_: string) => {});

export const useToast = () => {
  return useContext(ToastContext);
};
