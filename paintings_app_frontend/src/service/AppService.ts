import axios from "axios";
import usePaintingService from "./PaintingService";
import usePainterService from "./PainterService";

const API_URL = "http://127.0.0.1:8080/api/app";

const useAppService = () => {
  const { fetchAllPaintings } = usePaintingService();
  const { fetchAllPainters } = usePainterService();

  const resetEntities = async () => {
    await axios.post(API_URL + "/resetall");

    await fetchAllPaintings();
    await fetchAllPainters();
  };

  return { resetEntities };
};

export default useAppService;
