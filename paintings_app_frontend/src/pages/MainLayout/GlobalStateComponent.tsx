import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import usePaintingService from "../../services/PaintingService";

export enum LoadingStatus {
  LOADING,
  LOADED,
  ERROR,
}

interface Props {
  loadingStatus: LoadingStatus;
  setLoadingStatus: (status: LoadingStatus) => void;
}

const GlobalStateComponent = (props: Props) => {
  const { loadingStatus, setLoadingStatus } = props;
  const { fetchAllPaintings } = usePaintingService();

  useEffect(() => {
    const fetchPaintings = async () => {
      setLoadingStatus(LoadingStatus.LOADING);
      try {
        await fetchAllPaintings();
        setLoadingStatus(LoadingStatus.LOADED);
      } catch (error) {
        setLoadingStatus(LoadingStatus.ERROR);
      }
    };
    fetchPaintings();
  }, []);

  return loadingStatus === LoadingStatus.LOADING ? (
    <CircularProgress />
  ) : loadingStatus === LoadingStatus.LOADED ? (
    <Outlet />
  ) : (
    "Failed to fetch paintings. Please refresh."
  );
};

export default GlobalStateComponent;
