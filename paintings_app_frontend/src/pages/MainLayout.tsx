import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";

const MainLayout = () => {
  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <Paper
          elevation={0}
          sx={{
            minHeight: "100vh",
            borderRadius: 0,
          }}
        >
          <Container maxWidth="xl">
            <Paper
              elevation={1}
              sx={{
                minHeight: "100vh",
                padding: "50px",
              }}
            >
              <Outlet />
            </Paper>
          </Container>
        </Paper>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default MainLayout;
