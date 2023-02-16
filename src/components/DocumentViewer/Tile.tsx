import { Box, Typography } from "@mui/material";

interface FolderTileProps {
  name: string;
  onDoubleClick: () => void;
  icon: React.ReactElement;
}

const Tile: React.FC<FolderTileProps> = ({ name, onDoubleClick, icon }) => {
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
      onDoubleClick={onDoubleClick}
    >
      {icon}
      <Typography>{name}</Typography>
    </Box>
  );
};

export { Tile };
