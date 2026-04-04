import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchModel("http://localhost:5000/user/list");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch user list", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <Typography variant="h6" sx={{ p: 2, pb: 0, fontWeight: 'bold' }}>
        User List
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/users/${item._id}`}>
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="body2" sx={{ p: 2, color: 'text.secondary' }}>
        Select a user to view details.
      </Typography>
    </div>
  );
}

export default UserList;
