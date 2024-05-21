import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ReplayIcon from "@mui/icons-material/Replay";
import { Box, IconButton, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import usePainterService from "../../service/PainterService";
import usePaintingService from "../../service/PaintingService";
import { LoadingStatus } from "./GlobalStateComponent";

const topbarZIndex = 1201; // default z-index for Drawer + 1

interface Props {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
  loadingStatus: LoadingStatus;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
}

export default function Topbar({
  isDarkTheme,
  setIsDarkTheme,
  loadingStatus,
  setLoadingStatus,
}: Props) {
  const { setDefaultPaintings } = usePaintingService();
  const { setDefaultPainters } = usePainterService();
  const { enqueueSnackbar } = useSnackbar();

  const handleResetEntities = async () => {
    setLoadingStatus(LoadingStatus.LOADING);
    try {
      await setDefaultPaintings();
      await setDefaultPainters();
      enqueueSnackbar("Entities reset", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to reset entities", {
        variant: "error",
      });
    } finally {
      setLoadingStatus(LoadingStatus.LOADED);
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: topbarZIndex }}>
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box flexGrow={1} display="flex" justifyContent="center">
            <Typography variant="h6" noWrap component="div">
              Paintings App
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Reset entities">
              <span>
                <IconButton
                  onClick={handleResetEntities}
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
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
