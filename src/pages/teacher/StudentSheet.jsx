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

const StudentSheet = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const [response, setResponse] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(false);

  // Create mark modal state
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [createFormError, setCreateFormError] = useState("");

  // Edit mark modal state
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editSubject, setEditSubject] = useState("");
  const [editMarks, setEditMarks] = useState("");
  const [editMarkId, setEditMarksId] = useState("");

  const [editFormError, setEditFormError] = useState("");

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

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setSubject("");
    setMarks("");
    setCreateFormError("");
  };

  const handleOpenEditModal = (subject, marks, markId) => {
    setEditSubject(subject);
    setEditMarks(marks);
    setEditMarksId(markId);
    setOpenEditModal(true);
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
      if (!subject || !marks) {
        setCreateFormError("Subject and Marks are required.");
        return;
      }

      let jwtToken = localStorage.getItem("accessToken");

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/marks/create",
        {
          subject,
          mark: marks,
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
      toast.success("Mark created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create mark. Please try again.");
    }
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      let jwtToken = localStorage.getItem("accessToken");

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/marks/edit`,
        {
          mark: editMarks,
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
          q.subject === editSubject ? { ...q, mark: editMarks } : q
        )
      );
      handleCloseEditModal();
      toast.success("Mark updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update mark. Please try again.");
    }
  };

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
          <Typography variant="h3">Mark Listing</Typography>
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
              Create Mark
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
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length &&
                  questions.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user?.subject}</TableCell>
                      <TableCell>{user?.mark}</TableCell>
                      <TableCell>100</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleOpenEditModal(
                              user.subject,
                              user.mark,
                              user._id
                            )
                          }
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
                  Create Mark
                </Typography>
                <form onSubmit={handleSubmitCreate}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    margin="normal"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Marks"
                    variant="outlined"
                    margin="normal"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
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
            open={openEditModal}
            onClose={handleCloseEditModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openEditModal}>
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
                  Edit Mark
                </Typography>
                <form onSubmit={handleSubmitEdit}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    margin="normal"
                    value={editSubject}
                    disabled
                  />
                  <TextField
                    fullWidth
                    label="Marks"
                    variant="outlined"
                    margin="normal"
                    value={editMarks}
                    onChange={(e) => setEditMarks(e.target.value)}
                    required
                  />
                  {editFormError && (
                    <Alert severity="error" sx={{ marginTop: "1rem" }}>
                      {editFormError}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Fade>
          </Modal>
        </Box>
      )}
    </>
  );
};

export default StudentSheet;
