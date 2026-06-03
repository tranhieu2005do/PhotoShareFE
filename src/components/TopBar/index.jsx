import React, { useRef } from "react";
import { AppBar, Toolbar, Checkbox, Typography, Box, Button ,FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
function TopBar({ 
    context, 
    setCurrentUser,
    advancedFeatures,
    setAdvancedFeatures, }) 
  {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const handleUploadPhoto = async (event) => {
    try {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("photo", file);

      const response = await fetch("https://cckzwq-5000.csb.app/api/photo/new", {
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
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");

      // Clear current user
      setCurrentUser(null);
      navigate("/");
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
          {localStorage.getItem("first_name") +
            " " +
            localStorage.getItem("last_name")}
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

          <FormControlLabel
  control={
    <Checkbox
      checked={advancedFeatures}
      onChange={(e) => setAdvancedFeatures(e.target.checked)}
      sx={{
        color: "white",
        "&.Mui-checked": {
          color: "white",
        },
      }}
    />
  }
  label="Enable Advanced Features"
  sx={{
    color: "white",
    mr: 2,
  }}
/>

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
