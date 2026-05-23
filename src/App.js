import "./App.css";

import React, { useState } from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/Login";

const App = () => {
  const [topBarContext, setTopBarContext] = useState("");
  const [currentUser, setCurrentUser] = useState(false);

  return (
    <Router>
      {!currentUser && <LoginRegister />}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <TopBar context={topBarContext} />

        <Grid container spacing={0} sx={{ flexGrow: 1, pt: "64px" }}>
          <Grid
            item
            sm={3}
            sx={{
              height: "calc(100vh - 64px)",
              overflowY: "auto",
              borderRight: "1px solid #e2e8f0",
            }}
          >
            <Paper
              elevation={0}
              square
              sx={{ height: "100%", bgcolor: "white" }}
            >
              <UserList />
            </Paper>
          </Grid>

          <Grid
            item
            sm={9}
            sx={{
              height: "calc(100vh - 64px)",
              overflowY: "auto",
              bgcolor: "#f8fafc",
            }}
          >
            <Box sx={{ p: 4, height: "100%" }}>
              <Paper
                elevation={0}
                sx={{
                  minHeight: "100%",
                  borderRadius: 4,
                  bgcolor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/users" replace />} />
                  <Route
                    path="/users"
                    element={
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="60vh"
                      >
                        <Typography variant="h5" color="textSecondary">
                          Select a user to see details
                        </Typography>
                      </Box>
                    }
                  />
                  <Route
                    path="/users/:userId"
                    element={<UserDetail setContext={setTopBarContext} />}
                  />
                  <Route
                    path="/photos/:userId"
                    element={<UserPhotos setContext={setTopBarContext} />}
                  />
                </Routes>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Router>
  );
};

export default App;
