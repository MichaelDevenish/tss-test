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
        width: "calc(100% - 40px)",
        height: "100px",
        padding: "20px",
        cursor: "pointer",
      }}
      onDoubleClick={onDoubleClick}
    >
      {icon}
      <Typography
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export { Tile };
