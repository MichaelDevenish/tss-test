import { documentFilterState, Folder } from "../../state/Documents";
import FolderIcon from "@mui/icons-material/Folder";
import { useRecoilState } from "recoil";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

interface FolderTileProps {
  folder: Folder;
}

const FolderTile: React.FC<FolderTileProps> = ({ folder }) => {
  const [filters, setFilters] = useRecoilState(documentFilterState);
  const setParentId = useCallback(
    () => setFilters({ parentId: folder.id, search: undefined }),
    [setFilters, filters, folder.id]
  );
  return (
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
      onDoubleClick={setParentId}
    >
      <FolderIcon fontSize="large" />
      <Typography>{folder.name}</Typography>{" "}
    </Box>
  );
};

export { FolderTile };
