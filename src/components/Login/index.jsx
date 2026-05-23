import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

function LoginRegister() {
  const [loginForm, setLoginForm] = useState({
    loginName: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!loginForm.loginName.trim()) {
      setError("Please enter your login name");
      return;
    }

    setError("");

    try {
      // TODO: Call API login here
      console.log("Login with:", loginForm.loginName);

      /*
      const response = await axios.post("/admin/login", {
        login_name: loginName,
      });
      */
    } catch (err) {
      setError("Invalid login name");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#1e293b",
            textAlign: "center",
            mb: 1,
          }}
        >
          Photo Sharing
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#64748b",
            mb: 4,
          }}
        >
          Please login to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Login Name"
          variant="outlined"
          value={loginForm.loginName}
          onChange={(e) => setLoginForm(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          value={loginForm.password}
          onChange={(e) => setLoginForm(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            py: 1.2,
            fontWeight: 700,
            fontSize: "1rem",
            bgcolor: "#1e293b",
            "&:hover": {
              bgcolor: "#334155",
            },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default LoginRegister;
