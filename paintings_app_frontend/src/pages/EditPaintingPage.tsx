import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import usePaintingService from "../services/PaintingService";
import { useState } from "react";

const EditPaintingPage = () => {
  const id = Number(useParams().id);
  const { paintings, updatePainting } = usePaintingService();
  const [painting, setPainting] = useState(paintings.find((p) => p.id === id));
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof event.target.value);
    setPainting({
      ...painting,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        "& button, & .MuiTextField-root": { m: 1 },
      }}
    >
      {!painting ? (
        "Painting not found!"
      ) : (
        <>
          <h1>Edit Painting</h1>
          <div>
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              value={painting.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Description"
              name="description"
              value={painting.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Year"
              type="number"
              name="year"
              value={painting.year}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                updatePainting(painting.id, painting);
                enqueueSnackbar("Painting updated successfully", {
                  variant: "success",
                });
                navigate("/paintings");
              }}
            >
              Edit Painting
            </Button>
          </div>
        </>
      )}
      <div>
        <Button variant="contained" onClick={() => navigate("/paintings")}>
          Go Back
        </Button>
      </div>
    </Box>
  );
};

export default EditPaintingPage;
