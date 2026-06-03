import React, { useEffect, useState } from "react";
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
function PhotoDetail({
  photo,
  commentInputs,
  setCommentInputs,
  handleAddComment,
}) {
  if (!photo) {
    return <Typography sx={{ p: 4 }}>Loading photo...</Typography>;
  }
  const formatDate = (d) => {
    if (!d) return "Unknown date";
    const parsed = new Date(d.replace(" ", "T"));
    return isNaN(parsed) ? "Invalid Date" : parsed.toLocaleString();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 4 }}>
        <CardMedia component="img" image={photo.file_name} />

        <CardContent>
          <Typography variant="caption">
            Posted on {formatDate(photo.date_time)}
          </Typography>

          <Typography variant="h6">
            Comments ({photo.comments?.length || 0})
          </Typography>

          <Divider sx={{ my: 2 }} />

          {photo.comments && photo.comments.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {photo.comments.map((comment) => (
                <Box key={comment._id} sx={{ display: "flex", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "secondary.main",
                    }}
                  >
                    {comment.user_id.first_name}
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
                        to={`/users/${comment.user_id._id}`}
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                          fontWeight: "bold",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {comment.user_id.first_name} {comment.user_id.last_name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(comment.date_time).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
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

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              size="small"
              label="Write a comment..."
              value={commentInputs[photo._id] || ""}
              onChange={(e) =>
                setCommentInputs((prev) => ({
                  ...prev,
                  [photo._id]: e.target.value,
                }))
              }
            />

            <Button
              variant="contained"
              onClick={() => handleAddComment(photo._id)}
            >
              Post
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PhotoDetail;
