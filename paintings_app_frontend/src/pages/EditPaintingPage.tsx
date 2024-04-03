import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePaintingService from "../services/PaintingService";

const EditPaintingPage = () => {
  const id = Number(useParams().id);
  const { fetchPaintingById } = usePaintingService();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [painting, setPainting] = useState({} as Painting);
  const { updatePainting } = usePaintingService();

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const p = await fetchPaintingById(id);
        setPainting(p);
      } catch (error) {
        enqueueSnackbar("Failed to fetch painting. Please refresh", {
          variant: "error",
        });
      }
    };
    fetchAsync();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <h1>Edit Painting</h1>
      <div>
        <TextField
          variant="outlined"
          label="Name"
          name="name"
          value={painting.name}
          defaultValue=" "
          onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Description"
          name="description"
          value={painting.description}
          defaultValue=" "
          onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Year"
          type="number"
          name="year"
          value={painting.publicationYear}
          defaultValue={0}
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
      <div>
        <Button variant="contained" onClick={() => navigate("/paintings")}>
          Go Back
        </Button>
      </div>
    </Box>
  );
};

export default EditPaintingPage;
