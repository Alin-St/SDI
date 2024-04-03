import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useSnackbar } from "notistack";
import usePaintingService from "../../services/PaintingService";

interface Props {
  deleteIds: number[];
  setDeleteIds: (ids: number[]) => void;
}

export default function DeletePaintingDialog(props: Props) {
  const { deleteIds, setDeleteIds } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { getPaintingById, deletePaintings } = usePaintingService();

  if (deleteIds.some((id) => getPaintingById(id) === undefined)) {
    setDeleteIds(deleteIds.filter((id) => getPaintingById(id) !== undefined));
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
            deletePaintings(deleteIds);
            const s = deleteIds.length > 1 ? "s" : "";
            enqueueSnackbar("Painting" + s + " deleted successfully", {
              variant: "success",
            });
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
