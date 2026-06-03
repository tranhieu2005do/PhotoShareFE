import React, { useEffect, useState } from "react";
import PhotoDetail from "./PhotoDetail";
import PhotoListView from "./PhotoListView";
import { Typography, Box, Divider, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos({ setContext, advancedFeatures }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex === photos.length - 1) return;
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Photos of {user.first_name} {user.last_name} ({photos.length})
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {advancedFeatures ? (
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
      ) : (
        <PhotoListView
          photos={photos}
          commentInputs={commentInputs}
          setCommentInputs={setCommentInputs}
          handleAddComment={handleAddComment}
        />
      )}
      {advancedFeatures && currentPhoto && (
        <PhotoDetail
          photo={currentPhoto}
          commentInputs={commentInputs}
          setCommentInputs={setCommentInputs}
          handleAddComment={handleAddComment}
        />
      )}
    </Box>
  );
}

export default UserPhotos;
