import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  Select,
  MenuItem,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import "./dashboard.css"; // Import CSS file
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { saveAs } from "file-saver"; // Import saveAs function from file-saver library
import * as XLSX from "xlsx"; // Import XLSX library for Excel export

const StudentMarksheet = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const [response, setResponse] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let jwtToken = localStorage.getItem("accessToken");

        const { data } = await axios.get(
          "http://localhost:8080/api/v1/auth/marks/all",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        setLoading(false);
        setQuestions(data);
      } catch (err) {
        console.error(err);
        setLoading(false);
        // Handle errors
      }
    };

    fetchData();
  }, [response, id]);

  // Function to export table data to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(questions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marks");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "marks.xlsx");
  };

  return (
    <>
      {!loggedIn ? (
        <Box
          p={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "flex-start",
          }}
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
              marginRight: "1rem",
            }}
          >
            <span style={{ color: theme.palette.primary.contrastText }}>
              Back
            </span>
          </Button>

          <Typography variant="h3">
            Please <Link to={"/login"}>Log In</Link> to Continue
          </Typography>
        </Box>
      ) : (
        <Box
          width={isNotMobile ? "40%" : "80%"}
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          backgroundColor={theme.palette.background.alt}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ fontSize: "2.5rem", marginBottom: "1rem" }}
          >
            Mark Listing{" "}
          </Typography>
          <Box mt={2} mb={2}>
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
                marginRight: "1rem",
              }}
            >
              {/* Ensure text is visible */}
              <span style={{ color: theme.palette.primary.contrastText }}>
                Back
              </span>
            </Button>

            {/* Add export to Excel button */}
            <Button
              variant="contained"
              onClick={handleExportToExcel}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Export to Excel
            </Button>
          </Box>
          <Collapse in={error !== ""}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Marks</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length &&
                  questions.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user?.subject}</TableCell>
                      <TableCell>{user?.mark}</TableCell>
                      <TableCell>100</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default StudentMarksheet;
