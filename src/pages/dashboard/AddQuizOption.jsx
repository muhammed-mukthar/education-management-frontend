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
const AddQuizOptions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, setText] = useState("");
  const [response, setResponse] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(false);

  // Quiz options state
  const [quizOptions, setQuizOptions] = useState({
    question: "",
    answer: "",
    options: ["", "", "", ""],
    testId: "", // Updated to include 4 empty strings
  });

  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({
    question: "",
    answer: "",
    options: ["", "", "", ""], // Updated to include 4 empty strings
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let jwtToken = localStorage.getItem("accessToken");

        const { data } = await axios.post(
          `http://localhost:8080/api/v1/auth/list-quiz/${id}`,
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
  }, [response]);
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate minimum options and answer
    if (
      quizOptions.options.some((option) => option.trim() === "") ||
      quizOptions.options.length !== 4 ||
      quizOptions.answer.trim() === "" ||
      !quizOptions.options.includes(quizOptions.answer)
    ) {
      setValidationErrors({
        ...validationErrors,
        options: quizOptions.options.map((option, index) =>
          option.trim() === "" ? "Option is required" : ""
        ),
        answer: !quizOptions.options.includes(quizOptions.answer)
          ? "Answer should match one of the options"
          : "",
      });
      return;
    }

    try {
      quizOptions.testId = id;
      setLoading(true);
      let jwtToken = localStorage.getItem("accessToken");
      console.log(jwtToken, "jwt token");
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/create-quiz",
        { text, quizOptions }, // Include quiz options in the request
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setLoading(false);
      setResponse(!response);
      console.log(data);

      // Clear the form fields after successful submission
      setQuizOptions({
        question: "",
        answer: "",
        options: ["", "", "", ""],
      });
      setValidationErrors({
        question: "",
        answer: "",
        options: ["", "", "", ""],
      });
    } catch (err) {
      console.log(error);
      setLoading(false);

      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
      } else if (err?.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  // Handle input change for quiz options
  const handleQuizOptionChange = (index, value) => {
    const newOptions = [...quizOptions.options];
    newOptions[index] = value;
    setQuizOptions({ ...quizOptions, options: newOptions });
  };

  // Handle input change for other fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizOptions({ ...quizOptions, [name]: value });
  };
  console.log(questions, "thjis is questions");
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
          {" "}
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
            <span style={{ color: theme.palette.primary.contrastText }}>
              Back
            </span>
          </Button>
          <Typography variant="h3">
            Please
            <Link to={"/login"}>Log In</Link>
            to Continue
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
          {" "}
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
            <span style={{ color: theme.palette.primary.contrastText }}>
              Back
            </span>
          </Button>
          <Collapse in={error !== ""}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3">Create Quiz Options</Typography>

            {/* Quiz Options Input Fields */}

            <TextField
              placeholder="Question"
              type="text"
              name="question"
              required
              margin="normal"
              fullWidth
              value={quizOptions.question}
              onChange={handleInputChange}
            />

            {quizOptions.options.map((option, index) => (
              <TextField
                key={index}
                placeholder={`Option ${index + 1}`}
                type="text"
                required
                margin="normal"
                fullWidth
                value={option}
                onChange={(e) => handleQuizOptionChange(index, e.target.value)}
                error={validationErrors.options[index] !== ""}
                helperText={validationErrors.options[index]}
              />
            ))}

            {/* Select box for answer */}
            <Select
              value={quizOptions.answer}
              onChange={handleInputChange}
              name="answer"
              fullWidth
              displayEmpty
              required
              margin="normal"
            >
              <MenuItem disabled value="">
                Select Answer
              </MenuItem>
              {quizOptions.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
              disabled={loading}
            >
              submit
            </Button>
            <Typography mt={2}>
              Not this tool ? <Link to="/dashboard">GO BACK</Link>
            </Typography>
          </form>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>

                  <TableCell>question</TableCell>
                  <TableCell>Options 1</TableCell>
                  <TableCell>Options 2</TableCell>
                  <TableCell>Options 3</TableCell>
                  <TableCell>Options 4</TableCell>

                  <TableCell>Answer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length &&
                  questions?.map((user) => (
                    <TableRow key={user._id}>
                      {console.log(user, "this is user")}
                      <TableCell>{user.number}</TableCell>

                      <TableCell>{user.question}</TableCell>
                      {user?.options?.map((item) => {
                        return <TableCell>{item}</TableCell>;
                      })}
                      <TableCell>{user.answer}</TableCell>
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

export default AddQuizOptions;
