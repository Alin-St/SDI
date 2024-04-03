import { Container, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { darkTheme, lightTheme } from "../themes";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ReplayIcon from "@mui/icons-material/Replay";
import usePaintingService from "../services/PaintingService";

const MainLayout = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { setDefaultPaintings } = usePaintingService();

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <SnackbarProvider>
        <Paper
          elevation={0}
          sx={{
            minHeight: "100vh",
            borderRadius: 0,
          }}
        >
          <Container maxWidth="xl">
            <Paper
              elevation={3}
              sx={{
                minHeight: "100vh",
                padding: "50px",
                paddingTop: "20px",
              }}
            >
              <Stack direction="row" justifyContent="flex-end">
                <Tooltip title="Reset paintings">
                  <IconButton
                    onClick={() => {
                      setDefaultPaintings();
                    }}
                  >
                    <ReplayIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Toggle ligth theme">
                  <IconButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
                    {isDarkTheme ? <Brightness4Icon /> : <Brightness7Icon />}
                  </IconButton>
                </Tooltip>
              </Stack>
              <Outlet />
            </Paper>
          </Container>
        </Paper>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
