import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const MainLayout = () => {
  return (
    <SnackbarProvider>
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
    </SnackbarProvider>
  );
};

export default MainLayout;
