import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePaintingService from "../services/PaintingService";

const ViewPaintingPage = () => {
  const id = Number(useParams().id);
  const { fetchPaintingById } = usePaintingService();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [painting, setPainting] = useState({} as Painting);

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

  return (
    <Box
      sx={{
        "& button, & .MuiTextField-root": { m: 1 },
      }}
    >
      <h1>View Painting</h1>
      <div>
        <TextField
          variant="outlined"
          label="Name"
          value={painting.name}
          defaultValue=" "
          inputProps={{ readOnly: true }}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Description"
          value={painting.description}
          defaultValue=" "
          inputProps={{ readOnly: true }}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Year"
          type="number"
          value={painting.year}
          defaultValue={0}
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
