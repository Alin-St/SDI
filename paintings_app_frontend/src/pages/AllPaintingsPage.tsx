import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paintingService } from "../services/PaintingService";
import { useState } from "react";

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

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paintings.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.year}</td>
              <td>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => setDeleteId(p.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate("/painting/edit/" + p.id.toString())}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() =>
                    navigate("/painting/details/" + p.id.toString())
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
