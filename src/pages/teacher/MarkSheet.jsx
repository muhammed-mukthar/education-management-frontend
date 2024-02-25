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
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function MarkSheet() {
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  let fetchData = async () => {
    let jwtToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/marks/users",
      null, // Since you're sending a POST request, you likely don't need to send any data in the request body
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
    navigate(`/mark/${userId}`);
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
      {" "}
      <Typography variant="h3">Student Listing</Typography>
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
              <TableCell>MarkSheet</TableCell>
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAccept(user._id)}
                    >
                      View
                    </Button>
                  </TableCell>{" "}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MarkSheet;
