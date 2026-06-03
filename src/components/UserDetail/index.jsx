import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Divider, Stack, Paper } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";


function UserDetail({ setContext }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchModel(
          `https://cckzwq-5000.csb.app/api/user/${userId}`
        );
        setUser(response.data);
        if (setContext) {
          setContext(
            `Details of ${response.data.first_name} ${response.data.last_name}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch user detail", error);
      }
    };
    getUser();
  }, [userId, setContext]);

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading user details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, height: "100%" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Paper
        elevation={0}
        sx={{ p: 3, bgcolor: "#f8fafc", borderRadius: 4, mb: 4 }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              Location
            </Typography>
            <Typography variant="h6">{user.location}</Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              Occupation
            </Typography>
            <Typography variant="h6">{user.occupation}</Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              Description
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: "italic", mt: 1 }}>
              {user.description}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Button
        variant="contained"
        component={Link}
        to={`/photos/${user._id}`}
        size="large"
        sx={{ borderRadius: 8, px: 4 }}
      >
        View User Photos
      </Button>
    </Box>
  );
}

export default UserDetail;
