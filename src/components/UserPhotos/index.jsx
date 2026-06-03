import React, { useEffect, useState } from "react";
import AdvancedPhotoViewer from "./AdventureView";
import PhotoListView from "./PhotoListView";
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
  TextField,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos({ setContext, advancedFeatures }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [userId]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [photoData, userData] = await Promise.all([
          fetchModel(
            `https://cckzwq-5000.csb.app/api/photo/photosOfUser/${userId}`
          ),
          fetchModel(`https://cckzwq-5000.csb.app/api/user/${userId}`),
        ]);
        console.log(photoData);
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

  const handleAddComment = async (photoId) => {
    try {
      const comment = commentInputs[photoId];

      if (!comment?.trim()) {
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://cckzwq-5000.csb.app/api/photo/commentsOfPhoto/${photoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment,
          }),
        }
      );

      console.log("Comment response: ", response);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // clear input
      setCommentInputs((prev) => ({
        ...prev,
        [photoId]: "",
      }));

      // reload photos
      const photoData = await fetchModel(
        `https://cckzwq-5000.csb.app/api/photo/photosOfUser/${userId}`
      );

      setPhotos(photoData.data);
    } catch (err) {
      console.error(err);
    }
  };
  const currentPhoto = photos.length > 0 ? photos[currentIndex] : null;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Photos of {user.first_name} {user.last_name} ({photos.length})
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {advancedFeatures ? (
        <AdvancedPhotoViewer
          photos={photos}
          currentPhoto={currentPhoto}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          commentInputs={commentInputs}
          setCommentInputs={setCommentInputs}
          handleAddComment={handleAddComment}
        />
      ) : (
        <PhotoListView
          photos={photos}
          commentInputs={commentInputs}
          setCommentInputs={setCommentInputs}
          handleAddComment={handleAddComment}
        />
      )}
    </Box>
  );
}

export default UserPhotos;
