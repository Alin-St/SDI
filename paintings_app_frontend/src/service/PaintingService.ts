import { create } from "zustand";
import axios from "axios";

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
    const fetchedPaintings = (await axios.get(API_URL)).data as Painting[];
    setPaintings(fetchedPaintings);
  };

  const getPaintingById = (id: number) => {
    return paintings.find((p) => p.id === id);
  };

  const fetchPaintingById = async (id: number) => {
    const fetchedPainting = (await axios.get(API_URL + `/${id}`))
      .data as Painting;
    return fetchedPainting;
  };

  const addPainting = async (painting: Omit<Painting, "id">) => {
    const addedPainting = (await axios.post(API_URL, painting))
      .data as Painting;
    setPaintings([...paintings, addedPainting]);
  };

  const updatePainting = async (painting: Painting) => {
    const updatedPainting = (
      await axios.put(API_URL + `/${painting.id}`, painting)
    ).data as Painting;
    setPaintings(
      paintings.map((p) => (p.id === painting.id ? updatedPainting : p))
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

  const deleteAllPaintings = async () => {
    // Fetch all paintings
    const oldPaintings = (await axios.get(API_URL)).data as Painting[];
    // Delete all paintings
    await Promise.all(
      oldPaintings.map((p) => axios.delete(API_URL + `/${p.id}`))
    );
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
    deleteAllPaintings,
  };
};

export default usePaintingService;
