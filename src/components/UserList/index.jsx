import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  Chip,
  Box,
} from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchModel(
          "https://cckzwq-5000.csb.app/api/user/list"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch user list", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <Typography variant="h6" sx={{ p: 2, pb: 0, fontWeight: "bold" }}>
        User List
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={`/users/${item._id}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={`${item.first_name} ${item.last_name}`}
                />

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  {/* Photo Count */}
                  <Chip
                    label={item.photoCount}
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      bgcolor: "success.main",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "bold",

                      "& .MuiChip-label": {
                        p: 0,
                      },
                    }}
                  />

                  {/* Comment Count */}
                  <Chip
                    label={item.commentCount}
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      bgcolor: "error.main",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "bold",

                      "& .MuiChip-label": {
                        p: 0,
                      },
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/users/${item._id}/comments`);
                    }}
                  />
                </Box>
              </ListItemButton>
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="body2" sx={{ p: 2, color: "text.secondary" }}>
        Select a user to view details.
      </Typography>
    </div>
  );
}

export default UserList;
