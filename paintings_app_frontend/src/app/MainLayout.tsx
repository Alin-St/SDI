import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import GlobalStateComponent, {
  LoadingStatus,
} from "../components/layout/GlobalStateComponent";
import { lightTheme } from "../themes";

const MainLayout = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.LOADING);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <GlobalStateComponent
          loadingStatus={loadingStatus}
          setLoadingStatus={setLoadingStatus}
        >
          <DashboardLayout
            {...{ theme, setTheme, loadingStatus, setLoadingStatus }}
          >
            <Outlet />
          </DashboardLayout>
        </GlobalStateComponent>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
