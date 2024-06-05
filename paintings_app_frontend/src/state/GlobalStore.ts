import { Theme } from "@mui/material";
import { create } from "zustand";
import { lightTheme } from "../themes";

export enum LoadingStatus {
  LOADING,
  LOADED,
  ERROR,
}

interface GlobalState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadingStatus: LoadingStatus;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
}

const useGlobalStore = create<GlobalState>()((set) => ({
  theme: lightTheme,
  setTheme: (theme: Theme) => set({ theme }),
  loadingStatus: LoadingStatus.LOADING,
  setLoadingStatus: (loadingStatus: LoadingStatus) => set({ loadingStatus }),
}));

export default useGlobalStore;
