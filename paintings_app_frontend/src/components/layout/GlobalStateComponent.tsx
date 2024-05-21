import { CircularProgress } from "@mui/material";
import { ReactNode, useEffect } from "react";
import usePaintingService from "../../service/PaintingService";
import usePainterService from "../../service/PainterService";

export enum LoadingStatus {
  LOADING,
  LOADED,
  ERROR,
}

interface Props {
  children: ReactNode;
  loadingStatus: LoadingStatus;
  setLoadingStatus: (status: LoadingStatus) => void;
}

let didInit = false;

const GlobalStateComponent = ({
  children,
  loadingStatus,
  setLoadingStatus,
}: Props) => {
  const { fetchAllPaintings } = usePaintingService();
  const { fetchAllPainters } = usePainterService();

  useEffect(() => {
    if (didInit) return;
    didInit = true;

    const fetchEntities = async () => {
      setLoadingStatus(LoadingStatus.LOADING);
      try {
        await fetchAllPaintings();
        await fetchAllPainters();
        setLoadingStatus(LoadingStatus.LOADED);
      } catch (error) {
        setLoadingStatus(LoadingStatus.ERROR);
      }
    };
    fetchEntities();
  }, []);

  return loadingStatus === LoadingStatus.LOADING ? (
    <CircularProgress />
  ) : loadingStatus === LoadingStatus.LOADED ? (
    <>{children}</>
  ) : (
    <>Failed to fetch entities. Please refresh.</>
  );
};

export default GlobalStateComponent;
