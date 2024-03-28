import CloseIcon from "@mui/icons-material/Close";
import { Container, IconButton, Paper, Snackbar } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";

const MainLayout = () => {
  const [snackbarText, setSnackbarText] = useState(
    undefined as string | undefined
  );

  const handleSnackbarClose = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarText(undefined);
  };

  return (
    <ToastContext.Provider value={setSnackbarText}>
      <Container maxWidth="xl">
        <Paper
          elevation={3}
          style={{
            height: "100vh",
            backgroundColor: "lightgray",
            padding: "50px",
          }}
        >
          <Outlet />
        </Paper>
      </Container>

      <Snackbar
        open={snackbarText !== undefined}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarText}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </ToastContext.Provider>
  );
};

export default MainLayout;
