import { Box, Button, Paper, TextField } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const usernameRef = useRef("");
  const password1Ref = useRef("");
  const password2Ref = useRef("");

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
        <h2>Register</h2>
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
            inputRef={password1Ref}
            defaultValue=""
            type="password"
            sx={{ width: "100%", mt: 3 }}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Confirm password"
            inputRef={password2Ref}
            defaultValue=""
            type="password"
            sx={{ width: "100%", mt: 3 }}
          />
        </div>
        <div>
          <Button variant="contained" fullWidth sx={{ mt: 3 }}>
            Register
          </Button>
        </div>
        <Box mt={3}>
          You already have an account? <Link to="/login">Log In</Link>
        </Box>
      </Paper>
    </Box>
  );
}
