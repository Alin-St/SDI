import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import usePaintingService from "../services/PaintingService";

const ViewPaintingPage = () => {
  const id = Number(useParams().id);
  const { paintings } = usePaintingService();
  const painting = paintings.find((p) => p.id === id);
  const navigate = useNavigate();

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
          <h1>View Painting</h1>
          <div>
            <TextField
              variant="outlined"
              label="Name"
              value={painting.name}
              inputProps={{ readOnly: true }}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Description"
              value={painting.description}
              inputProps={{ readOnly: true }}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Year"
              type="number"
              value={painting.year}
              inputProps={{ readOnly: true }}
            />
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

export default ViewPaintingPage;
