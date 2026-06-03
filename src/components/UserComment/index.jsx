import React, { useEffect, useState } from "react";
import PhotoDetail from "../UserPhotos/PhotoDetail";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserComments({ setContext }) {
  const { userId } = useParams();

  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [commentData, userData] = await Promise.all([
          fetchModel(`https://cckzwq-5000.csb.app/api/user/${userId}/comments`),
          fetchModel(`https://cckzwq-5000.csb.app/api/user/${userId}`),
        ]);

        setComments(commentData.data.data);
        setUser(userData.data);

        setContext?.(
          `Comments by ${userData.data.first_name} ${userData.data.last_name}`
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [userId, setContext]);

  const handleOpenPhoto = async (photoId) => {
    try {
      const res = await fetchModel(
        `https://cckzwq-5000.csb.app/api/photo/${photoId}`
      );

      const photo = res.data.data;

      console.log("Photo: ", photo);

      setSelectedPhoto(photo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (photoId) => {
    try {
      const comment = commentInputs[photoId];
      if (!comment?.trim()) return;

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://cckzwq-5000.csb.app/api/photo/commentsOfPhoto/${photoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      setCommentInputs((prev) => ({
        ...prev,
        [photoId]: "",
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (selectedPhoto) {
    return (
      <Box sx={{ p: 4 }}>
        <Button onClick={() => setSelectedPhoto(null)} sx={{ mb: 2 }}>
          ← Back to comments
        </Button>
        {console.log(selectedPhoto)}
        <PhotoDetail
          photo={selectedPhoto}
          commentInputs={commentInputs}
          setCommentInputs={setCommentInputs}
          handleAddComment={handleAddComment}
        />
      </Box>
    );
  }

  if (!user) {
    return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Comments by {user.first_name} {user.last_name}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {comments.length === 0 ? (
        <Typography>No comments</Typography>
      ) : (
        comments.map((item, index) => (
          <Card
            key={index}
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              p: 2,
            }}
          >
            <CardMedia
              component="img"
              image={`https://cckzwq-5000.csb.app/images/${item.photo_file_name}`}
              onClick={() => handleOpenPhoto(item.photo_id)}
              sx={{
                width: 120,
                height: 120,
                borderRadius: 2,
                cursor: "pointer",
              }}
            />

            <CardContent>
              <Typography
                onClick={() => handleOpenPhoto(item.photo_id)}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                {item.comment}
              </Typography>

              <Typography variant="caption">
                {new Date(item.date_time).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default UserComments;
