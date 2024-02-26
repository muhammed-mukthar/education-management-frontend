// Import necessary dependencies and icons
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
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteFileId, setDeleteFileId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    if (selectedFile.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "5px" }}
        />
      );
    } else if (selectedFile.type.startsWith("video/")) {
      return (
        <video
          controls
          style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "5px" }}
        >
          <source
            src={URL.createObjectURL(selectedFile)}
            type={selectedFile.type}
          />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      // For other file types, show an icon preview
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            width: "100%",
            height: "150px",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
          }}
        >
          <InsertDriveFileIcon style={{ fontSize: "64px", color: "#757575" }} />
        </Box>
      );
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleFileDelete = async (id) => {
    try {
      let jwtToken = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/api/v1/auth/file/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      fetchFiles();
      setIsDeleteModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteFileId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      bgcolor={theme.palette.background.alt}
    >
      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={closeDeleteModal}
        handleDelete={() => handleFileDelete(deleteFileId)}
      />
      <Button
        variant="contained"
        component={Link}
        to="/dashboard"
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            bgcolor: theme.palette.primary.dark,
          },
          marginRight: "1rem",
        }}
      >
        <span style={{ color: theme.palette.primary.contrastText }}>Back</span>
      </Button>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontSize: "2.5rem", marginBottom: "1rem" }}
      >
        Study Materials
      </Typography>
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
              {renderFilePreview()}
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
                  <ListItemText
                    primary={
                      file.filename.length > 20
                        ? file.filename.substring(0, 20) + "..."
                        : file.filename
                    }
                  />
                  <ListItemText primary={file.teacher} />
                  <ListItemText primary={formatDate(file.createdAt)} />
                  <Box ml={1}>
                    <IconButton
                      onClick={() =>
                        handleFileDownload(file._id, file.filename)
                      }
                    >
                      <CloudDownloadIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => openDeleteModal(file._id)}
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
