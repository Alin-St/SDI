import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import usePaintingService from "../services/PaintingService";
import LoadingButton from "@mui/lab/LoadingButton";

const AddPaintingPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { addPainting } = usePaintingService();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    const year = parseInt(yearRef.current?.value || "0", 10);

    setIsAdding(true);
    try {
      await addPainting(name, description, year);
      enqueueSnackbar("Painting added successfully", {
        variant: "success",
      });
      navigate("/paintings");
    } catch (error) {
      enqueueSnackbar("Failed to add painting", {
        variant: "error",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Box
      sx={{
        "& button, & .MuiTextField-root": { m: 1 },
      }}
    >
      <h1>Add Painting</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            variant="outlined"
            label="Name"
            inputRef={nameRef}
            defaultValue=""
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Description"
            inputRef={descriptionRef}
            defaultValue=""
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Year"
            type="number"
            inputRef={yearRef}
            defaultValue="0"
          />
        </div>
        <div>
          <LoadingButton
            type="submit"
            variant="contained"
            color="success"
            loading={isAdding}
          >
            Save
          </LoadingButton>
        </div>
      </form>
      <div>
        <Button
          variant="outlined"
          color="error"
          disabled={isAdding}
          onClick={() => navigate("/paintings")}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default AddPaintingPage;
