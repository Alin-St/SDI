import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import GlobalStateComponent, {
  LoadingStatus,
} from "../components/layout/GlobalStateComponent";
import { lightTheme } from "../themes";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
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
            {children}
          </DashboardLayout>
        </GlobalStateComponent>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
