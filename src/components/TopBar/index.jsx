import React, { useRef } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

function TopBar({ context, setCurrentUser }) {
  const fileInputRef = useRef(null);

  const handleUploadPhoto = async (event) => {
    try {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("photo", file);

      const response = await fetch("https://cckzwq-5000.csb.app/photos/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Upload success:", data);

      alert("Photo uploaded successfully!");

      // reset input
      event.target.value = "";
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
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
      localStorage.removeItem("user_id");

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

          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleUploadPhoto}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInputRef.current.click()}
            sx={{
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Add Photo
          </Button>

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
