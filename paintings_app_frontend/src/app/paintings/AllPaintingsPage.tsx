import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePaintingService from "../../services/PaintingService";
import DeletePaintingDialog from "../../components/paintings/DeletePaintingDialog";
import ExportPaintingsDialog from "../../components/paintings/ExportPaintingsDialog";
import PaintingsTableComponent from "../../components/paintings/PaintingsTableComponent";

const AllPaintingsPage = () => {
  const navigate = useNavigate();
  const { paintings } = usePaintingService();
  const [selectedPaintings, setSelectedPaintings] = useState<number[]>([]);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportDialogKey, setExportDialogKey] = useState(Date.now());

  // Deselect paintings that are no longer in the list
  if (selectedPaintings.some((id) => !paintings.some((p) => p.id === id))) {
    setSelectedPaintings(
      selectedPaintings.filter((id) => paintings.some((p) => p.id === id))
    );
  }

  const handleExport = () => {
    setShowExportDialog(true);
    setExportDialogKey(Date.now());
  };

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
          <Button variant="outlined" sx={{ m: 1 }} onClick={handleExport}>
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

      <DeletePaintingDialog {...{ deleteIds, setDeleteIds }} />

      <ExportPaintingsDialog
        key={exportDialogKey}
        {...{ paintings, showExportDialog, setShowExportDialog }}
      />
    </>
  );
};

export default AllPaintingsPage;
