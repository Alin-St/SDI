import { create } from "zustand";
import axios from "axios";
import defaultPainters from "../domain/defaultPainters";

const API_URL = "http://127.0.0.1:8080/api/painters";

interface PainterStore {
  painters: Painter[];
  setPainters: (painters: Painter[]) => void;
}

const usePainterStore = create<PainterStore>()((set) => ({
  painters: [],
  setPainters: (painters: Painter[]) => set({ painters }),
}));

const usePainterService = () => {
  const { painters, setPainters } = usePainterStore();

  const fetchAllPainters = async () => {
    const fetchedPainters = (await axios.get(API_URL)).data as Painter[];
    setPainters(fetchedPainters);
  };

  const getPainterById = (id: number) => {
    return painters.find((p) => p.id === id);
  };

  const fetchPainterById = async (id: number) => {
    const fetchedPainter = (await axios.get(API_URL + `/${id}`))
      .data as Painter;
    return fetchedPainter;
  };

  const addPainter = async (painter: Omit<Painter, "id">) => {
    const addedPainter = (await axios.post(API_URL, painter)).data as Painter;
    setPainters([...painters, addedPainter]);
  };

  const updatePainter = async (painter: Painter) => {
    const updatedPainter = (
      await axios.put(API_URL + `/${painter.id}`, painter)
    ).data as Painter;
    setPainters(
      painters.map((p) => (p.id === painter.id ? updatedPainter : p))
    );
  };

  const deletePainter = async (id: number) => {
    await axios.delete(API_URL + `/${id}`);
    setPainters(painters.filter((p) => p.id !== id));
  };

  const deletePainters = async (ids: number[]) => {
    const deleteRequests = ids.map(async (id) => {
      await axios.delete(API_URL + `/${id}`);
    });
    await Promise.all(deleteRequests);
    setPainters(painters.filter((p) => !ids.includes(p.id)));
  };

  const setDefaultPainters = async () => {
    // Fetch all painters
    const oldPainters = (await axios.get(API_URL)).data as Painter[];
    // Delete all painters
    await Promise.all(
      oldPainters.map((p) => axios.delete(API_URL + `/${p.id}`))
    );
    // Add default painters
    const newPainters = await Promise.all(
      defaultPainters.map(
        async (p) => (await axios.post(API_URL, p)).data as Painter
      )
    );
    setPainters(newPainters);
  };

  return {
    painters,
    fetchAllPainters,
    getPainterById,
    fetchPainterById,
    addPainter,
    updatePainter,
    deletePainter,
    deletePainters,
    setDefaultPainters,
  };
};

export default usePainterService;
