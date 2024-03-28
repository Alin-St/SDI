import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { paintingService } from "../services/PaintingService";

const AddPaintingPage = () => {
  const navigate = useNavigate();
  const showToast = useToast();

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    year: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        "& button, & .MuiTextField-root": { m: 1 },
      }}
    >
      <h1>Add Painting</h1>
      <div>
        <TextField
          variant="outlined"
          label="Name"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="Year"
          type="number"
          name="year"
          value={formState.year.toString()}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            paintingService.addPainting(
              formState.name,
              formState.description,
              formState.year
            );
            showToast("Painting added successfully");
            navigate("/paintings");
          }}
        >
          Add Painting
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

export default AddPaintingPage;
