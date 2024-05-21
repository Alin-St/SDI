import PanoramaIcon from "@mui/icons-material/Panorama";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

export default function SideMenu({ width: sideMenuWidth }: { width: number }) {
  const navigate = useNavigate();

  const handlePaintingsClick = () => {
    navigate("/paintings");
  };

  const handlePaintersClick = () => {
    navigate("/painters");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sideMenuWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sideMenuWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem key="Paintings" disablePadding>
            <ListItemButton onClick={handlePaintingsClick}>
              <ListItemIcon>
                <PanoramaIcon />
              </ListItemIcon>
              <ListItemText primary="Paintings" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Painters" disablePadding>
            <ListItemButton onClick={handlePaintersClick}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Painters" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
