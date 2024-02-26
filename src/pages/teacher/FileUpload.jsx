import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      let jwtToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8080/api/v1/auth/files",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      let jwtToken = localStorage.getItem("accessToken");
      await axios.post("http://localhost:8080/api/v1/auth/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      fetchFiles();
      setSelectedFile(null); // Reset selected file after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileDownload = async (id, filename) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/auth/download/${id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleFileDelete = async (id) => {
    try {
      let jwtToken = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/api/v1/auth/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
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
          marginRight: "1rem",
        }}
      >
        <span style={{ color: theme.palette.primary.contrastText }}>Back</span>
      </Button>
      <Typography variant="h3">Test Listing</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center">
            Uploaded Files
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <input
              // accept="image/*, video/*"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </Box>
          {selectedFile && (
            <Box display="flex" justifyContent="center" mt={1}>
              {selectedFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
              ) : (
                <Typography variant="body1">
                  {selectedFile.name} - {selectedFile.type}
                </Typography>
              )}
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
            disabled={!selectedFile}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <List>
            {files.map((file) => (
              <Paper key={file._id} elevation={3}>
                <ListItem>
                  <ListItemIcon>
                    {file.path.endsWith(".jpg") ||
                    file.path.endsWith(".png") ? (
                      <ImageIcon />
                    ) : file.path.endsWith(".mp4") ? (
                      <VideoLibraryIcon />
                    ) : (
                      <InsertDriveFileIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={file.filename} />
                  <ListItemText primary={file?.teacher} />
                  <ListItemText primary={file?.createdAt} />

                  <Box ml={1}>
                    <IconButton
                      onClick={() =>
                        handleFileDownload(file._id, file.filename)
                      }
                    >
                      <CloudDownloadIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleFileDelete(file._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Grid>
      </Grid>{" "}
    </Box>
  );
}

export default FileUpload;
