import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import usePainterService from "../../../service/PainterService";

const ViewPainterPage = () => {
  const id = Number(useParams().id);
  const { painters } = usePainterService();
  const painter = painters.find((p) => p.id === id);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        "& button, & .MuiTextField-root": { m: 1 },
      }}
    >
      {!painter ? (
        "Painter not found!"
      ) : (
        <>
          <h1>View Painter</h1>
          <div>
            <TextField
              variant="outlined"
              label="Name"
              value={painter.name}
              inputProps={{ readOnly: true }}
            />
          </div>
        </>
      )}
      <div>
        <Button variant="contained" onClick={() => navigate("/painters")}>
          Go Back
        </Button>
      </div>
    </Box>
  );
};

export default ViewPainterPage;
