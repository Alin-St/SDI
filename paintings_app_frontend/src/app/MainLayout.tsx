import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import GlobalStateComponent from "../components/layout/GlobalStateComponent";
import useGlobalStore from "../state/GlobalStore";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const { theme } = useGlobalStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <GlobalStateComponent>{children}</GlobalStateComponent>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
