import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum LoadingStatus {
  LOADING,
  LOADED,
  ERROR,
}

interface GlobalState {
  theme: string;
  setTheme: (theme: string) => void;
  loadingStatus: LoadingStatus;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
}

const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: string) => set({ theme }),
      loadingStatus: LoadingStatus.LOADING,
      setLoadingStatus: (loadingStatus: LoadingStatus) =>
        set({ loadingStatus }),
    }),
    {
      name: "global-store",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export default useGlobalStore;
