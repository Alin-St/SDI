import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paintingService } from "../services/PaintingService";
import { useState } from "react";

const AddPaintingPage = () => {
  const navigate = useNavigate();

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
