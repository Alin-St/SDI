import {
  Button,
  ButtonGroup,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paintingService } from "../../services/PaintingService";
import DeletePaintingDialog from "./DeletePaintingDialog";
import ExportPaintingsDialog from "./ExportPaintingsDialog";

const AllPaintingsPage = () => {
  const navigate = useNavigate();
  const [paintings, setPaintings] = useState(paintingService.getAllPaintings());
  const [selectedPaintings, setSelectedPaintings] = useState([] as number[]);
  if (selectedPaintings.some((id) => !paintings.some((p) => p.id === id))) {
    setSelectedPaintings(
      selectedPaintings.filter((id) => paintings.some((p) => p.id === id))
    );
  }
  const [deleteIds, setDeleteIds] = useState([] as number[]);
  const [showExportDialog, setShowExportDialog] = useState(false);

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

      <DeletePaintingDialog
        {...{ deleteIds, setDeleteIds, paintings, setPaintings }}
      />

      <ExportPaintingsDialog
        {...{ paintings, showExportDialog, setShowExportDialog }}
      />
    </>
  );
};

export default AllPaintingsPage;
