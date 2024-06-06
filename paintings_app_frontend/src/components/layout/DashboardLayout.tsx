import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode } from "react";
import useGlobalStore from "../../state/GlobalStore";
import SideMenu from "./SideMenu";
import Topbar from "./Topbar";

const sideMenuWidth = 240;

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { theme, setTheme, loadingStatus, setLoadingStatus } = useGlobalStore();

  const isDarkTheme = theme === "dark";
  const setIsDarkTheme = (isDarkTheme: boolean) =>
    setTheme(isDarkTheme ? "dark" : "light");

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
