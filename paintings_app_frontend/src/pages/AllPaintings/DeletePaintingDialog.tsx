import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useSnackbar } from "notistack";
import usePaintingService from "../../services/PaintingService";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface Props {
  deleteIds: number[];
  setDeleteIds: (ids: number[]) => void;
}

export default function DeletePaintingDialog(props: Props) {
  const { deleteIds, setDeleteIds } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { getPaintingById, deletePaintings } = usePaintingService();
  const [loading, setLoading] = useState(false);

  if (deleteIds.some((id) => getPaintingById(id) === undefined)) {
    setDeleteIds(deleteIds.filter((id) => getPaintingById(id) !== undefined));
  }

  const handleDeletePaintings = async () => {
    setLoading(true);
    try {
      await deletePaintings(deleteIds);
      enqueueSnackbar("Paintings deleted", {
        variant: "success",
      });
      setDeleteIds([]);
    } catch (error) {
      enqueueSnackbar("Failed to delete paintings", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleDeletePaintings}
        >
          Yes
        </LoadingButton>
        <Button
          disabled={loading}
          variant="outlined"
          onClick={() => setDeleteIds([])}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
