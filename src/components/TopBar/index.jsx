import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

function TopBar({ context, setCurrentUser }) {
  const handleLogout = async () => {
    try {
      const response = await fetch("https://cckzwq-5000.csb.app/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Logout:", data);

      // JWT
      localStorage.removeItem("token");

      // Clear current user
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "#1e293b",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "800",
            letterSpacing: 0.5,
          }}
        >
          Do Tran Hieu
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              opacity: 0.9,
              fontWeight: "500",
            }}
          >
            {context || "Photo Sharing App"}
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
