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
import { useSelector } from "react-redux";

const TeacherTestListing = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const userData = useSelector((state) => state.userId.userData);

  const [response, setResponse] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(false);

  // Create test modal state
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [createFormError, setCreateFormError] = useState("");

  // Edit test modal state
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editSubject, setEditSubject] = useState("");
  const [editMarks, setEditMarks] = useState("");
  const [editMarkId, setEditMarksId] = useState("");

  const [editFormError, setEditFormError] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteMarkId, setDeleteMarkId] = useState("");

  const handleOpenDeleteModal = (markId) => {
    setDeleteMarkId(markId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteMark = async () => {
    try {
      let jwtToken = localStorage.getItem("accessToken");

      await axios.delete(
        `http://localhost:8080/api/v1/auth/tests/delete/${deleteMarkId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // Update questions state by filtering out the deleted test
      setQuestions(questions.filter((q) => q._id !== deleteMarkId));
      handleCloseDeleteModal();
      toast.success("Test deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete test. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let jwtToken = localStorage.getItem("accessToken");

        const { data } = await axios.get(
          `http://localhost:8080/api/v1/auth/teacher-tests`,
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

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setSubject("");
    setMarks("");
    setCreateFormError("");
  };

  const handleViewQuestion = (testId) => {
    navigate(`/add-quiz/${testId}`);
  };
  const handleViewResult = (testId) => {
    navigate(`/result/${testId}`);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditSubject("");
    setEditMarksId("");
    setEditMarks("");
    setEditFormError("");
  };

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    try {
      if (!subject) {
        setCreateFormError("Name is required.");
        return;
      }

      let jwtToken = localStorage.getItem("accessToken");

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/tests/create",
        {
          name: subject,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // Update questions state with new data
      setQuestions([...questions, data]);
      handleCloseCreateModal();
      toast.success("Test created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create test. Please try again.");
    }
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      let jwtToken = localStorage.getItem("accessToken");

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/marks/edit`,
        {
          test: editMarks,
          markId: editMarkId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // Update questions state with new data
      setQuestions(
        questions.map((q) =>
          q.subject === editSubject ? { ...q, test: editMarks } : q
        )
      );
      handleCloseEditModal();
      toast.success("Test updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update test. Please try again.");
    }
  };

  // Function to export table data to Excel
  const handleExportToExcel = () => {
    let filteredQuestions = questions.filter(
      (user) => userData.role === "branch" || user.teacherId === userData._id
    );
    const worksheet = XLSX.utils.json_to_sheet(filteredQuestions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marks");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "tests.xlsx");
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
            Test Listing{" "}
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
            <Button
              variant="contained"
              onClick={handleOpenCreateModal}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
                marginRight: "1rem",
              }}
            >
              Create Test
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
                  <TableCell>Name</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Result</TableCell>

                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length ? (
                  questions
                    .filter(
                      (user) =>
                        userData.role === "branch" ||
                        user.teacherId === userData._id
                    )
                    .map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.course}</TableCell>
                        <TableCell>{user?.teacher}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewQuestion(user._id)}
                          >
                            View
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleViewResult(user._id)}
                          >
                            View Result
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleOpenDeleteModal(user._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Data found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            open={openCreateModal}
            onClose={handleCloseCreateModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openCreateModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  boxShadow: 24,
                  padding: "2rem",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                  Create Test
                </Typography>
                <form onSubmit={handleSubmitCreate}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />

                  {createFormError && (
                    <Alert severity="error" sx={{ marginTop: "1rem" }}>
                      {createFormError}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Fade>
          </Modal>

          <Modal
            open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openDeleteModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  boxShadow: 24,
                  padding: "2rem",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                  Delete Test
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
                  Are you sure you want to delete this test?
                </Typography>
                <Button
                  onClick={handleDeleteMark}
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: "1rem" }}
                >
                  Delete
                </Button>
                <Button
                  onClick={handleCloseDeleteModal}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </Box>
            </Fade>
          </Modal>
        </Box>
      )}
    </>
  );
};

export default TeacherTestListing;
