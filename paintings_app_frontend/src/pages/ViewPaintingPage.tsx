import { Box, Button, TextField } from "@mui/material";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { paintingService } from "../services/PaintingService";

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

const ViewPaintingPage = () => {
  const navigate = useNavigate();
  const painting = useLoaderData() as Painting;

  return (
    <Box
      sx={{
        "& button, & .MuiTextField-root": { m: 1 },
      }}
    >
      <h1>View Painting</h1>
      <div>
        <TextField
          label="Name"
          value={painting.name}
          inputProps={{ readOnly: true }}
        />
      </div>
      <div>
        <TextField
          label="Description"
          value={painting.description}
          inputProps={{ readOnly: true }}
        />
      </div>
      <div>
        <TextField
          label="Year"
          value={painting.year.toString()}
          inputProps={{ readOnly: true }}
        />
      </div>
      <div>
        <Button variant="contained" onClick={() => navigate("/paintings")}>
          Go Back
        </Button>
      </div>
    </Box>
  );
};

export default ViewPaintingPage;
