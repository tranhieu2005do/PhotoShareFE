import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ context }) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1e293b' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: '800', letterSpacing: 0.5 }}>
          Do Tran Hieu
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h6" color="inherit" sx={{ opacity: 0.9, fontWeight: '500' }}>
            {context || "Photo Sharing App"}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
