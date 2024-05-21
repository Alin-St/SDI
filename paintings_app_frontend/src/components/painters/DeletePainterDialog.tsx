import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import usePainterService from "../../service/PainterService";

interface Props {
  deleteIds: number[];
  setDeleteIds: (ids: number[]) => void;
}

export default function DeletePainterDialog({
  deleteIds,
  setDeleteIds,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { deletePainters } = usePainterService();
  const [loading, setLoading] = useState(false);

  const handleDeletePainters = async () => {
    setLoading(true);
    try {
      await deletePainters(deleteIds);
      enqueueSnackbar("Painters deleted", {
        variant: "success",
      });
      setDeleteIds([]);
    } catch (error) {
      enqueueSnackbar("Failed to delete painters", {
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
          onClick={handleDeletePainters}
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
