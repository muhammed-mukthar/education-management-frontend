import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useTheme,
  Button,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function UserList() {
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  let fetchData = async () => {
    let jwtToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/list",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    if (response.data.length) {
      console.log(response.data);
      setUsers(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(users);

  const handleAccept = async (userId) => {
    let jwtToken = localStorage.getItem("accessToken");

    try {
      await axios.post(
        `http://localhost:8080/api/v1/auth/accept/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      fetchData();
      toast.success("User Accepted Successfully");
    } catch (err) {
      console.log("Error:", err); // Log the entire error object for debugging
      let errorMessage = "An error occurred";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      width={"40%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Button
        variant="contained"
        component={Link}
        to="/dashboard"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        {/* Ensure text is visible */}
        <span style={{ color: theme.palette.primary.contrastText }}>Back</span>
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Accepted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length &&
              users?.map((user) => (
                <TableRow key={user._id}>
                  {console.log(user, "this is user")}
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.course}</TableCell>
                  <TableCell>
                    {user.verify ? (
                      "Accepted"
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAccept(user._id)}
                      >
                        Accept
                      </Button>
                    )}
                  </TableCell>{" "}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserList;
