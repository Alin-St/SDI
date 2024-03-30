import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useToast } from "../../contexts/ToastContext";
import { paintingService } from "../../services/PaintingService";

interface Props {
  deleteIds: number[];
  setDeleteIds: (ids: number[]) => void;
  paintings: Painting[];
  setPaintings: (paintings: Painting[]) => void;
}

export default function DeletePaintingDialog(props: Props) {
  const { deleteIds, setDeleteIds, paintings, setPaintings } = props;
  const showToast = useToast();

  if (deleteIds.some((id) => !paintings.some((p) => p.id === id))) {
    setDeleteIds(deleteIds.filter((id) => paintings.some((p) => p.id === id)));
  }

  return (
    <Dialog
      open={deleteIds.length > 0}
      onClose={() => setDeleteIds([])}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        Do you really want to delete{" "}
        {deleteIds.length > 1 ? "these items" : "this item"}?
      </DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            deleteIds.forEach((deleteId) => {
              paintingService.deletePainting(deleteId);
            });
            setPaintings(paintingService.getAllPaintings());
            const s = deleteIds.length > 1 ? "s" : "";
            showToast("Painting" + s + " deleted successfully");
          }}
        >
          Yes
        </Button>
        <Button variant="outlined" onClick={() => setDeleteIds([])}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
