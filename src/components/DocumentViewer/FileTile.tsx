import type { File } from "../../state/Documents";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useState, useCallback } from "react";

interface FileTileProps {
  file: File;
}

const FileTile: React.FC<FileTileProps> = ({ file }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = useCallback(() => setShowModal(true), [setShowModal]);
  const closeModal = useCallback(() => setShowModal(false), [setShowModal]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
          border: "1px solid grey",
          width: "100%",
          height: "100px",
          cursor: "pointer",
        }}
        onDoubleClick={openModal}
      >
        <InsertDriveFileIcon />
        {file.name}
      </Box>
      <Dialog open={showModal} onClose={closeModal} fullWidth>
        <DialogTitle>Reading File: {file.name}</DialogTitle>
        <DialogContent>
          <DialogTitle>{file.content}</DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { FileTile };
// todo render multiline
