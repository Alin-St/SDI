import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paintingService } from "../services/PaintingService";

const AllPaintingsPage = () => {
  const navigate = useNavigate();
  const [paintings, setPaintings] = useState(paintingService.getAllPaintings());
  const [deleteId, setDeleteId] = useState(undefined as number | undefined);

  return (
    <>
      <h1>All Paintings</h1>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          onClick={() => navigate("/painting/add")}
          variant="contained"
          sx={{ m: 1 }}
        >
          Add Painting
        </Button>
      </Box>

      <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
        <Table>
          <TableHead
            sx={{
              "& .MuiTableCell-root": { fontWeight: "bold", fontSize: "1em" },
            }}
          >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paintings.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.year}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() => setDeleteId(p.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() =>
                      navigate("/painting/edit/" + p.id.toString())
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() =>
                      navigate("/painting/details/" + p.id.toString())
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteId !== undefined}
        onClose={() => setDeleteId(undefined)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Do you really want to delete this item?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              paintingService.deletePainting(deleteId!);
              setPaintings(paintingService.getAllPaintings());
              setDeleteId(undefined);
            }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={() => setDeleteId(undefined)}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllPaintingsPage;
