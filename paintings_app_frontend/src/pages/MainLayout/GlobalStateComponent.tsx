import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import usePaintingService from "../../services/PaintingService";

const GlobalStateComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAllPaintings } = usePaintingService();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchPaintings = async () => {
      setIsLoading(true);
      try {
        await fetchAllPaintings();
      } catch (error) {
        enqueueSnackbar("Failed to fetch paintings. Please refresh", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaintings();
  }, []);

  return <>{isLoading ? <CircularProgress /> : <Outlet />}</>;
};

export default GlobalStateComponent;
