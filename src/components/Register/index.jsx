import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
    login_name: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://cckzwq-5000.csb.app/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Register successfully");

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f1f5f9",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: 500,
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3}>
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="First Name"
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm({
              ...form,
              first_name: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Last Name"
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm({
              ...form,
              last_name: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Location"
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Occupation"
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm({
              ...form,
              occupation: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Login Name"
          sx={{ mb: 2 }}
          onChange={(e) =>
            setForm({
              ...form,
              login_name: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          sx={{ mb: 3 }}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <Button fullWidth variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </Paper>
    </Box>
  );
}

export default Register;
