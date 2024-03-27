import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        style={{
          height: "100vh",
          backgroundColor: "lightgray",
          padding: "50px",
        }}
      >
        <Outlet />
      </Paper>
    </Container>
  );
};

export default MainLayout;
