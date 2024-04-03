import { create } from "zustand";
import defaultPaintings from "../domain/defaultPaintings";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "paintings";

interface PaintingStore {
  paintings: Painting[];
  setPaintings: (paintings: Painting[]) => void;
}

const usePaintingStore = create<PaintingStore>()(
  persist(
    (set) => ({
      paintings: defaultPaintings,
      setPaintings: (paintings: Painting[]) => set({ paintings }),
    }),
    { name: STORAGE_KEY }
  )
);

const usePaintingService = () => {
  const { paintings, setPaintings } = usePaintingStore();

  const getAllPaintings = () => paintings;

  const getPaintingById = (id: number) => paintings.find((p) => p.id === id);

  const addPainting = (name: string, description: string, year: number) => {
    const id =
      paintings.length > 0 ? Math.max(...paintings.map((p) => p.id)) + 1 : 1;
    const newPainting = { id, name, description, year };
    setPaintings([...paintings, newPainting]);
  };

  const updatePainting = (id: number, updatedPainting: Painting) => {
    setPaintings(paintings.map((p) => (p.id === id ? updatedPainting : p)));
  };

  const deletePainting = (id: number) => {
    setPaintings(paintings.filter((p) => p.id !== id));
  };

  const deletePaintings = (ids: number[]) => {
    setPaintings(paintings.filter((p) => !ids.includes(p.id)));
  };

  const setDefaultPaintings = () => {
    setPaintings(defaultPaintings);
  };

  return {
    getAllPaintings,
    getPaintingById,
    addPainting,
    updatePainting,
    deletePainting,
    deletePaintings,
    setDefaultPaintings,
  };
};

export default usePaintingService;
