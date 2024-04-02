import { Container, IconButton, Paper, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { darkTheme, lightTheme } from "../themes";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const MainLayout = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <SnackbarProvider>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
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
                <IconButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
                  {isDarkTheme ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Stack>
              <Outlet />
            </Paper>
          </Container>
        </Paper>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default MainLayout;
