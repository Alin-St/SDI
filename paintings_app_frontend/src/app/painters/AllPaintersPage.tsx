import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeletePainterDialog from "../../components/painters/DeletePainterDialog";
import ExportPaintersDialog from "../../components/painters/ExportPaintersDialog";
import PaintersTableComponent from "../../components/painters/PaintersTableComponent";
import usePainterService from "../../service/PainterService";

export default function AllPaintersPage() {
  const navigate = useNavigate();
  const { painters } = usePainterService();
  const [selectedPainters, setSelectedPainters] = useState<number[]>([]);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportDialogKey, setExportDialogKey] = useState(Date.now());

  // Deselect painters that are no longer in the list
  if (selectedPainters.some((id) => !painters.some((p) => p.id === id))) {
    setSelectedPainters(
      selectedPainters.filter((id) => painters.some((p) => p.id === id))
    );
  }

  const handleExport = () => {
    setShowExportDialog(true);
    setExportDialogKey(Date.now());
  };

  return (
    <>
      <h1>Painters</h1>
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          disabled={selectedPainters.length === 0}
          sx={{ m: 1 }}
          onClick={() => setDeleteIds(selectedPainters)}
        >
          Delete Selected
        </Button>

        <Stack direction="row">
          <Button variant="outlined" sx={{ m: 1 }} onClick={handleExport}>
            Export
          </Button>
          <Button
            onClick={() => navigate("/painter/add")}
            variant="contained"
            sx={{ m: 1 }}
          >
            Add Painter
          </Button>
        </Stack>
      </Stack>

      <PaintersTableComponent
        {...{
          painters,
          selectedPainters,
          setSelectedPainters,
        }}
        viewPainter={(id) => navigate("/painter/details/" + id.toString())}
        editPainter={(id) => navigate("/painter/edit/" + id.toString())}
        deletePainters={(ids) => setDeleteIds(ids)}
      />

      <DeletePainterDialog {...{ deleteIds, setDeleteIds }} />

      <ExportPaintersDialog
        key={exportDialogKey}
        {...{ painters, showExportDialog, setShowExportDialog }}
      />
    </>
  );
}
