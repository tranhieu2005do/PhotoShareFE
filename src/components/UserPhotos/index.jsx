import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ setContext }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [photoData, userData] = await Promise.all([
          fetchModel(`https://cckzwq-5000.csb.app/photosOfUser/${userId}`),
          fetchModel(`https://cckzwq-5000.csb.app/user/${userId}`),
        ]);
        setPhotos(photoData.data);
        setUser(userData.data);
        if (setContext) {
          setContext(
            `Photos of ${userData.data.first_name} ${userData.data.last_name}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch user photos", error);
      }
    };
    getData();
  }, [userId, setContext]);

  if (!user) {
    return <Typography sx={{ p: 4 }}>Loading photos...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={6}>
        {photos.map((photo) => (
          <Grid item xs={12} key={photo._id}>
            <Card sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 4 }}>
              <CardMedia
                component="img"
                image={photo.file_name}
                alt="User post"
                sx={{
                  maxHeight: 700,
                  width: "100%",
                  objectFit: "contain",
                  bgcolor: "#f1f5f9",
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                  mb={2}
                  sx={{ fontSize: "0.9rem" }}
                >
                  Posted on:{" "}
                  {new Date(photo.date_time).toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Comments
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {photo.comments && photo.comments.length > 0 ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    {photo.comments.map((comment) => (
                      <Box key={comment._id} sx={{ display: "flex", gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "secondary.main",
                          }}
                        >
                          {comment.user.first_name[0]}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="subtitle2"
                              component={Link}
                              to={`/users/${comment.user._id}`}
                              sx={{
                                textDecoration: "none",
                                color: "primary.main",
                                fontWeight: "bold",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {comment.user.first_name} {comment.user.last_name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {new Date(comment.date_time).toLocaleString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ mt: 0.5, color: "text.primary" }}
                          >
                            {comment.comment}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    fontStyle="italic"
                  >
                    No comments yet. Be the first to comment!
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {photos.length === 0 && (
          <Grid item xs={12}>
            <Box textAlign="center" py={8} bgcolor="#f8fafc" borderRadius={4}>
              <Typography variant="h5" color="textSecondary">
                This user hasn't shared any moments yet.
              </Typography>
              <Button component={Link} to={`/users`} sx={{ mt: 2 }}>
                Go Back to Users
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default UserPhotos;
