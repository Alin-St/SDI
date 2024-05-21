import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePainterService from "../../../service/PainterService";

const EditPainterPage = () => {
  const id = Number(useParams().id);
  const { painters, updatePainter } = usePainterService();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const painter = painters.find((p) => p.id === id);

  const nameRef = useRef<HTMLInputElement>(null);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameRef.current?.value || "";

    if (!painter?.id) throw new Error("Painter not found");

    setIsUpdating(true);
    try {
      await updatePainter({
        id: painter.id,
        name,
      });
      enqueueSnackbar("Painter added successfully", {
        variant: "success",
      });
      navigate("/painters");
    } catch (error) {
      enqueueSnackbar("Failed to add painter", {
        variant: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Box
      sx={{
        "& button, & .MuiTextField-root": { m: 1 },
      }}
    >
      {!painter ? (
        "Painter not found!"
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              variant="outlined"
              label="Name"
              inputRef={nameRef}
              defaultValue={painter.name}
            />
          </div>
          <div>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isUpdating}
            >
              Save
            </LoadingButton>
          </div>
        </form>
      )}
      <div>
        <Button
          variant="outlined"
          disabled={isUpdating}
          onClick={() => navigate("/painters")}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default EditPainterPage;
