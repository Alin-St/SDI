import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { paintingService } from "../services/PaintingService";
import { useSnackbar } from "notistack";

export function loader({ params }: LoaderFunctionArgs): Painting {
  if (!params.id) {
    throw new Error("Expected params.id");
  }
  let painting = paintingService.getPaintingById(Number(params.id));
  if (!painting) {
    throw new Error(`Uh oh, I couldn't find a painting with id "${params.id}"`);
  }
  return painting;
}

const EditPaintingPage = () => {
  const navigate = useNavigate();
  const initialPainting = useLoaderData() as Painting;
  const [painting, setPainting] = useState(initialPainting);
  const { enqueueSnackbar } = useSnackbar();

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
          defaultValue={initialPainting.name}
          value={painting.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Description"
          name="description"
          defaultValue={initialPainting.description}
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
          defaultValue={initialPainting.year}
          value={painting.year}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            paintingService.updatePainting(painting.id, painting);
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
