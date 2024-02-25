import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./dashboard.css"; // Import CSS file

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [parentsEmail, setParentsEmail] = useState(""); // New state for parent's email
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !role || !selectedClass) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/auth/register", {
        username,
        email,
        password,
        role,
        course: selectedClass,
        parentsEmail: role === "student" ? parentsEmail : undefined, // Only send parentsEmail if role is "student"
      });
      setLoading(false);
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      console.log("Error:", err); // Log the entire error object for debugging
      let errorMessage = "An error occurred";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error !== ""}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Register</Typography>
        <TextField
          label="Username"
          required
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          label="Email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="Password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required margin="normal">
          <InputLabel>Class</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <MenuItem value="bca">BCA</MenuItem>
            <MenuItem value="bcom">BCOM</MenuItem>
          </Select>
        </FormControl>
        {role === "student" && ( // Render parents email field only if role is "student"
          <TextField
            label="Parent's Email"
            type="email"
            required
            margin="normal"
            fullWidth
            value={parentsEmail}
            onChange={(e) => {
              setParentsEmail(e.target.value);
            }}
          />
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
          disabled={loading}
        >
          Register
        </Button>
        <Typography mt={2}>
          Already have an account ? <Link to="/login">Login</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Register;
