import { Box, Button, Paper, TextField } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: 400, p: 3, pt: 0 }}>
        <h2>Login</h2>
        <div>
          <TextField
            variant="outlined"
            label="Username"
            inputRef={usernameRef}
            defaultValue=""
            sx={{ width: "100%" }}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Password"
            inputRef={passwordRef}
            defaultValue=""
            type="password"
            sx={{ width: "100%", mt: 3 }}
          />
        </div>
        <div>
          <Button variant="contained" fullWidth sx={{ mt: 3 }}>
            Log In
          </Button>
        </div>
        <Box mt={3}>
          You don't have an account? <Link to="/register">Register</Link>
        </Box>
      </Paper>
    </Box>
  );
}
