import { create } from "zustand";
import axios from "axios";
import defaultPaintings from "../domain/defaultPaintings";

const API_URL = "http://127.0.0.1:8080/api/paintings";

interface PaintingStore {
  paintings: Painting[];
  setPaintings: (paintings: Painting[]) => void;
}

const usePaintingStore = create<PaintingStore>()((set) => ({
  paintings: [],
  setPaintings: (paintings: Painting[]) => set({ paintings }),
}));

const usePaintingService = () => {
  const { paintings, setPaintings } = usePaintingStore();

  const fetchAllPaintings = async () => {
    const response = await axios.get(API_URL);
    setPaintings(response.data);
    console.log("AIIC");
  };

  const getPaintingById = (id: number) => {
    return paintings.find((p) => p.id === id);
  };

  const fetchPaintingById = async (id: number) => {
    const response = await axios.get(API_URL + `/${id}`);
    return response.data;
  };

  const addPainting = async (
    name: string,
    description: string,
    year: number
  ) => {
    const response = await axios.post(API_URL, {
      name,
      description,
      year,
    });
    setPaintings([...paintings, response.data]);
  };

  const updatePainting = async (id: number, updatedPainting: Painting) => {
    await axios.put(API_URL + `/${id}`, updatedPainting);
    setPaintings(
      paintings.map((p) => (p.id === id ? { ...p, ...updatedPainting } : p))
    );
  };

  const deletePainting = async (id: number) => {
    await axios.delete(API_URL + `/${id}`);
    setPaintings(paintings.filter((p) => p.id !== id));
  };

  const deletePaintings = async (ids: number[]) => {
    const deleteRequests = ids.map(async (id) => {
      await axios.delete(API_URL + `/${id}`);
    });
    await Promise.all(deleteRequests);
    setPaintings(paintings.filter((p) => !ids.includes(p.id)));
  };

  const setDefaultPaintings = async () => {
    await fetchAllPaintings();
    await Promise.all(paintings.map((p) => deletePainting(p.id)));
    await Promise.all(
      defaultPaintings.map((p) => addPainting(p.name, p.description, p.year))
    );
    setPaintings(defaultPaintings);
  };

  return {
    paintings,
    fetchAllPaintings,
    getPaintingById,
    fetchPaintingById,
    addPainting,
    updatePainting,
    deletePainting,
    deletePaintings,
    setDefaultPaintings,
  };
};

export default usePaintingService;
