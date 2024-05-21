import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import Papa from "papaparse";
import { useState } from "react";

interface Props {
  paintings: Painting[];
  showExportDialog: boolean;
  setShowExportDialog: (show: boolean) => void;
}

export default function ExportPaintingsDialog(props: Props) {
  const { paintings, showExportDialog, setShowExportDialog } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [exportType, setExportType] = useState("");
  const exportText =
    exportType === "json"
      ? JSON.stringify(paintings, null, 2)
      : exportType === "csv"
      ? Papa.unparse(paintings)
      : "";

  const handleClose = () => {
    setShowExportDialog(false);
  };

  return (
    <Dialog open={showExportDialog} fullWidth onClose={handleClose}>
      <DialogTitle>
        Export all paintings to{" "}
        <Select
          value={exportType}
          sx={{ minWidth: 100 }}
          size="small"
          onChange={(e) => setExportType(e.target.value)}
        >
          <MenuItem value="json">JSON</MenuItem>
          <MenuItem value="csv">CSV</MenuItem>
        </Select>
      </DialogTitle>
      <DialogContent>
        <TextField
          multiline
          inputProps={{ readOnly: true }}
          value={exportText}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          disabled={exportText === ""}
          onClick={() => {
            navigator.clipboard.writeText(exportText);
            enqueueSnackbar("Export copied to clipboard");
          }}
        >
          Copy to Clipboard
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
