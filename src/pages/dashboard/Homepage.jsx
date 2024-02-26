import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import EmailIcon from "@mui/icons-material/Email";
import CodeIcon from "@mui/icons-material/Code";
import HistoryIcon from "@mui/icons-material/History";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import "./dashboard.css"; // Import CSS file
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import GradeIcon from "@mui/icons-material/Grade";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/userIdSlice";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
const Homepage = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userId.userData);
  const dispatch = useDispatch();

  //handle logout
  const handleLogout = async () => {
    try {
      console.log("this is me");
      localStorage.setItem("authToken", false);

      dispatch(setUserData(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {userData?.role == "student" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              Test
            </Typography>
            <Card
              onClick={() => navigate("/file-listing")}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <InsertDriveFileIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5"></Typography>
                <Typography variant="h6"> Study Material </Typography>
              </Stack>
            </Card>
          </Box>
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              Test
            </Typography>
            <Card
              onClick={() => navigate("/student-tests")}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <PsychologyAltIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  Test
                </Typography>
                <Typography variant="h6"> Test </Typography>
              </Stack>
            </Card>
          </Box>
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              MarkSheet
            </Typography>
            <Card
              onClick={() => navigate("/mark-list")}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <GradeIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  Mark Sheet
                </Typography>
                <Typography variant="h6"> Mark Sheet </Typography>
              </Stack>
            </Card>
          </Box>
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              Home{" "}
            </Typography>
            <Card
              onClick={handleLogout}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <LogoutIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  go Home
                </Typography>
                <Typography variant="h6"> </Typography>
              </Stack>
            </Card>
          </Box>
        </Box>
      ) : userData?.role == "teacher" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {" "}
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              Share Materials{" "}
            </Typography>
            <Card
              onClick={() => navigate("/files")}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <InsertDriveFileIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  Share Materials{" "}
                </Typography>
                <Typography variant="h6"> </Typography>
              </Stack>
            </Card>
          </Box>
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              Test
            </Typography>
            <Card
              onClick={() => navigate("/teacher-tests")}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <PeopleIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  Test
                </Typography>
                <Typography variant="h6"> </Typography>
              </Stack>
            </Card>
          </Box>
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              MarkSheet{" "}
            </Typography>
            <Card
              onClick={() => navigate("/marks")}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <GradeIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  MarkSheet{" "}
                </Typography>
                <Typography variant="h6"> </Typography>
              </Stack>
            </Card>
          </Box>
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              Home{" "}
            </Typography>
            <Card
              onClick={handleLogout}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <LogoutIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  go Home
                </Typography>
                <Typography variant="h6"> </Typography>
              </Stack>
            </Card>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              User List{" "}
            </Typography>
            <Card
              onClick={() => navigate("/users")}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <PeopleIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  User List
                </Typography>
                <Typography variant="h6"> </Typography>
              </Stack>
            </Card>
          </Box>

          <Box
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" mb={2} fontWeight="bold">
              Home{" "}
            </Typography>
            <Card
              onClick={handleLogout}
              sx={{
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                height: 250,
                width: 250,
                "&:hover": {
                  border: 2,
                  boxShadow: 0,
                  borderColor: "primary.dark",
                  cursor: "pointer",
                },
              }}
            >
              <LogoutIcon
                sx={{ fontSize: 80, color: "primary.main", mt: 2, ml: 2 }}
              />
              <Stack
                p={3}
                pt={0}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold" variant="h5">
                  go Home
                </Typography>
                <Typography variant="h6"> </Typography>
              </Stack>
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Homepage;
