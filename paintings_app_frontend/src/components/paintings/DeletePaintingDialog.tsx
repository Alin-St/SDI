import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import usePaintingService from "../../service/PaintingService";

interface Props {
  deleteIds: number[];
  setDeleteIds: (ids: number[]) => void;
}

export default function DeletePaintingDialog(props: Props) {
  const { deleteIds, setDeleteIds } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { deletePaintings } = usePaintingService();
  const [loading, setLoading] = useState(false);

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

  const handleClose = () => {
    setDeleteIds([]);
  };

  return (
    <Dialog
      open={deleteIds.length > 0}
      onClose={handleClose}
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
        <Button disabled={loading} variant="outlined" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
