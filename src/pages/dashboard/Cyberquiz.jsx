import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "./dashboard.css"; // Import CSS file

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
} from "@mui/material";
import CyberSecurityQuizComponent from "../quiz/CyberSecurityQuizComponet";

const Cybequiz = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);
  const goback = () => {
    navigate("/dashboard");
  };
  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let jwtToken = localStorage.getItem("accessToken");

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/openai/Cybequiz",
        { text },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setLoading(false);
      console.log(data);
      setResponse(data);
    } catch (err) {
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
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
          <Typography variant="h3">
            Please
            <Link to={"/login"}>Log In</Link>
            to Continue
          </Typography>
        </Box>
      ) : (
        <Box
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

          <CyberSecurityQuizComponent id={id} />
          {response ? (
            <Card
              sx={{
                mt: 4,
                border: 1,
                boxShadow: 0,
                height: "500px",
                borderRadius: 5,
                borderColor: "natural.medium",
                bgcolor: "background.default",
              }}
            >
              <Typography p={2}>{response}</Typography>
            </Card>
          ) : (
            ""
          )}
        </Box>
      )}
    </>
  );
};

export default Cybequiz;
