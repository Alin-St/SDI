import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ReplayIcon from "@mui/icons-material/Replay";
import { Container, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useState } from "react";
import GlobalStateComponent, {
  LoadingStatus,
} from "../components/layout/GlobalStateComponent";
import usePaintingService from "../services/PaintingService";
import { darkTheme, lightTheme } from "../themes";

const MainLayout = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { setDefaultPaintings } = usePaintingService();
  const { enqueueSnackbar } = useSnackbar();

  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.LOADING);

  const handleResetPaintings = async () => {
    setLoadingStatus(LoadingStatus.LOADING);
    try {
      await setDefaultPaintings();
      enqueueSnackbar("Paintings reset", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to reset paintings", {
        variant: "error",
      });
    } finally {
      setLoadingStatus(LoadingStatus.LOADED);
    }
  };

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
                  <span>
                    <IconButton
                      onClick={handleResetPaintings}
                      disabled={loadingStatus !== LoadingStatus.LOADED}
                    >
                      <ReplayIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Toggle light theme">
                  <IconButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
                    {isDarkTheme ? <Brightness4Icon /> : <Brightness7Icon />}
                  </IconButton>
                </Tooltip>
              </Stack>
              <GlobalStateComponent
                loadingStatus={loadingStatus}
                setLoadingStatus={setLoadingStatus}
              />
            </Paper>
          </Container>
        </Paper>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
