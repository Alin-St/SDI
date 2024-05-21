import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode } from "react";
import { darkTheme, lightTheme } from "../../themes";
import SideMenu from "./SideMenu";
import Topbar from "./Topbar";
import { LoadingStatus } from "./GlobalStateComponent";

const sideMenuWidth = 240;

interface Props {
  children: ReactNode;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadingStatus: LoadingStatus;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
}

export default function DashboardLayout({
  children,
  theme,
  setTheme,
  loadingStatus,
  setLoadingStatus,
}: Props) {
  const isDarkTheme = theme === darkTheme;
  const setIsDarkTheme = (isDarkTheme: boolean) =>
    setTheme(isDarkTheme ? darkTheme : lightTheme);

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar
        {...{ isDarkTheme, setIsDarkTheme, loadingStatus, setLoadingStatus }}
      />
      <SideMenu width={sideMenuWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
