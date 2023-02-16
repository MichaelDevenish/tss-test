import type { File } from "../../state/Documents";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState, useCallback } from "react";
import { Tile } from "./Tile";

interface FileTileProps {
  file: File;
}

const FileTile: React.FC<FileTileProps> = ({ file }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = useCallback(() => setShowModal(true), [setShowModal]);
  const closeModal = useCallback(() => setShowModal(false), [setShowModal]);
  return (
    <>
      <Tile
        icon={<InsertDriveFileIcon fontSize="large" />}
        name={file.name}
        onDoubleClick={openModal}
      />
      <Dialog open={showModal} onClose={closeModal} fullWidth>
        <DialogTitle
          sx={{
            maxWidth: "600px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          Reading File: {file.name}
        </DialogTitle>
        <DialogContent>
          <DialogTitle>
            <Typography style={{ whiteSpace: "pre-line", wordBreak: 'break-word' }}>
              {file.content}
            </Typography>
          </DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { FileTile };
