import { Button, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeletePaintingDialog from "./DeletePaintingDialog";
import ExportPaintingsDialog from "./ExportPaintingsDialog";
import PaintingsTableComponent from "./PaintingsTableComponent";
import usePaintingService from "../../services/PaintingService";
import { useSnackbar } from "notistack";

const AllPaintingsPage = () => {
  const navigate = useNavigate();
  const { fetchAllPaintings, paintings } = usePaintingService();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaintings, setSelectedPaintings] = useState([] as number[]);
  const [deleteIds, setDeleteIds] = useState([] as number[]);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        await fetchAllPaintings();
      } catch (error) {
        enqueueSnackbar("Failed to fetch paintings. Please refresh", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <h1>All Paintings</h1>
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          disabled={selectedPaintings.length === 0}
          sx={{ m: 1 }}
          onClick={() => setDeleteIds(selectedPaintings)}
        >
          Delete Selected
        </Button>

        <Stack direction="row">
          <Button
            variant="outlined"
            sx={{ m: 1 }}
            onClick={() => setShowExportDialog(true)}
          >
            Export
          </Button>
          <Button
            onClick={() => navigate("/painting/add")}
            variant="contained"
            sx={{ m: 1 }}
          >
            Add Painting
          </Button>
        </Stack>
      </Stack>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <PaintingsTableComponent
          {...{
            paintings,
            selectedPaintings,
            setSelectedPaintings,
          }}
          viewPainting={(id) => navigate("/painting/details/" + id.toString())}
          editPainting={(id) => navigate("/painting/edit/" + id.toString())}
          deletePaintings={(ids) => setDeleteIds(ids)}
        />
      )}

      <DeletePaintingDialog {...{ deleteIds, setDeleteIds }} />

      <ExportPaintingsDialog
        {...{ paintings, showExportDialog, setShowExportDialog }}
      />
    </>
  );
};

export default AllPaintingsPage;
