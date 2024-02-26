import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function DeleteModal({ open, handleClose, handleDelete }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete File</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this file?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
