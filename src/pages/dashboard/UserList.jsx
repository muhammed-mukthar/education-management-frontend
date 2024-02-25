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

function UserList() {
  const [users, setUsers] = useState([]);
  const theme = useTheme();

  useEffect(() => {
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
    fetchData();
  }, []);
  console.log(users);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length &&
              users?.map((user) => (
                <TableRow key={user._id}>
                  {console.log(user, "this is user")}
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserList;
