import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Papa from "papaparse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { paintingService } from "../services/PaintingService";

const AllPaintingsPage = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const [paintings, setPaintings] = useState(paintingService.getAllPaintings());
  const [selectedPaintings, setSelectedPaintings] = useState([] as number[]);
  if (selectedPaintings.some((id) => !paintings.some((p) => p.id === id))) {
    setSelectedPaintings(
      selectedPaintings.filter((id) => paintings.some((p) => p.id === id))
    );
  }
  const [deleteIds, setDeleteIds] = useState([] as number[]);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportType, setExportType] = useState("");
  if (!showExportDialog && exportType !== "") {
    setExportType("");
  }
  const exportText =
    exportType === "json"
      ? JSON.stringify(paintings, null, 2)
      : exportType === "csv"
      ? Papa.unparse(paintings) + "HELLLLO "
      : "";

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

      <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
        <Table>
          <TableHead
            sx={{
              "& .MuiTableCell-root": { fontWeight: "bold", fontSize: "1em" },
            }}
          >
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedPaintings.length === paintings.length}
                  indeterminate={
                    selectedPaintings.length > 0 &&
                    selectedPaintings.length < paintings.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPaintings(paintings.map((p) => p.id));
                    } else {
                      setSelectedPaintings([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paintings.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPaintings.includes(p.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPaintings([...selectedPaintings, p.id]);
                      } else {
                        setSelectedPaintings(
                          selectedPaintings.filter((id) => id !== p.id)
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.year}</TableCell>
                <TableCell>
                  <ButtonGroup variant="contained">
                    <Button onClick={() => setDeleteIds([p.id])}>Delete</Button>
                    <Button
                      onClick={() =>
                        navigate("/painting/edit/" + p.id.toString())
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() =>
                        navigate("/painting/details/" + p.id.toString())
                      }
                    >
                      View
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
              showToast("Painting(s) deleted successfully");
              setDeleteIds([]);
            }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={() => setDeleteIds([])}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showExportDialog}
        fullWidth
        onClose={() => setShowExportDialog(false)}
      >
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
              showToast("Export copied to clipboard");
            }}
          >
            Copy to Clipboard
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowExportDialog(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllPaintingsPage;
