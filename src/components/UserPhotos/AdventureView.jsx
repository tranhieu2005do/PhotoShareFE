import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

function AdvancedPhotoViewer({
  photos,
  currentPhoto,
  currentIndex,
  setCurrentIndex,
  commentInputs,
  setCommentInputs,
  handleAddComment,
}) {
  if (photos.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5" color="textSecondary">
          This user hasn't shared any moments yet.
        </Typography>

        <Button component={Link} to="/users" sx={{ mt: 2 }}>
          Go Back to Users
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev - 1)}
        >
          Previous
        </Button>

        <Typography variant="h6">
          {currentIndex + 1} / {photos.length}
        </Typography>

        <Button
          variant="contained"
          disabled={currentIndex === photos.length - 1}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>

      {currentPhoto && (
        <Card
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          <CardMedia
            component="img"
            image={currentPhoto.file_name}
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
            >
              Posted on {new Date(currentPhoto.date_time).toLocaleString()}
            </Typography>

            <Typography variant="h6" fontWeight="bold">
              Comments ({currentPhoto.comments.length})
            </Typography>

            <Divider sx={{ my: 2 }} />

            {currentPhoto.comments.length > 0 ? (
              currentPhoto.comments.map((comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar>{comment.user_id.first_name[0]}</Avatar>

                  <Box>
                    <Typography
                      component={Link}
                      to={`/users/${comment.user_id._id}`}
                      sx={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: "primary.main",
                      }}
                    >
                      {comment.user_id.first_name} {comment.user_id.last_name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                    >
                      {new Date(comment.date_time).toLocaleString()}
                    </Typography>

                    <Typography variant="body2">{comment.comment}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>No comments yet</Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Write a comment..."
                value={commentInputs[currentPhoto._id] || ""}
                onChange={(e) =>
                  setCommentInputs((prev) => ({
                    ...prev,
                    [currentPhoto._id]: e.target.value,
                  }))
                }
              />

              <Button
                variant="contained"
                onClick={() => handleAddComment(currentPhoto._id)}
              >
                Post
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default AdvancedPhotoViewer;
