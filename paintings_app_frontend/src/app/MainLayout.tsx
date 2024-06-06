import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import GlobalStateComponent from "../components/layout/GlobalStateComponent";
import useGlobalStore from "../state/GlobalStore";
import { darkTheme, lightTheme } from "../themes";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const { theme: themeString } = useGlobalStore();
  const theme = themeString === "dark" ? darkTheme : lightTheme;

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
