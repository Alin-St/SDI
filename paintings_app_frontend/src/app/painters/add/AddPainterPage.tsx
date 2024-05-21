import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePainterService from "../../../service/PainterService";

const AddPainterPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { addPainter } = usePainterService();

  const nameRef = useRef<HTMLInputElement>(null);

  const [isAdder, setIsAdder] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameRef.current?.value || "";

    setIsAdder(true);
    try {
      await addPainter({ name });
      enqueueSnackbar("Painter added successfully", {
        variant: "success",
      });
      navigate("/painters");
    } catch (error) {
      enqueueSnackbar("Failed to add painter", {
        variant: "error",
      });
    } finally {
      setIsAdder(false);
    }
  };

  return (
    <Box
      sx={{
        "& button, & .MuiTextField-root": { m: 1 },
      }}
    >
      <h1>Add Painter</h1>

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
          <LoadingButton type="submit" variant="contained" loading={isAdder}>
            Save
          </LoadingButton>
        </div>
      </form>
      <div>
        <Button
          variant="outlined"
          disabled={isAdder}
          onClick={() => navigate("/painters")}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default AddPainterPage;
