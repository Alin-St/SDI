import { CircularProgress } from "@mui/material";
import { ReactNode, useEffect } from "react";
import usePainterService from "../../service/PainterService";
import usePaintingService from "../../service/PaintingService";
import useGlobalStore, { LoadingStatus } from "../../state/GlobalStore";

let didInit = false;

interface Props {
  children: ReactNode;
}

const GlobalStateComponent = ({ children }: Props) => {
  const { fetchAllPaintings } = usePaintingService();
  const { fetchAllPainters } = usePainterService();
  const { loadingStatus, setLoadingStatus } = useGlobalStore();

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
