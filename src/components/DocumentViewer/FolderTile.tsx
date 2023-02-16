import {
  documentParentState,
  documentSearchState,
  Folder,
} from "../../state/Documents";
import FolderIcon from "@mui/icons-material/Folder";
import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { Tile } from "./Tile";

interface FolderTileProps {
  folder: Folder;
}

const FolderTile: React.FC<FolderTileProps> = ({ folder }) => {
  const [parentId, setParent] = useRecoilState(documentParentState);
  const [search, setSearch] = useRecoilState(documentSearchState);

  const setParentId = useCallback(() => {
    setParent(folder.id);
    setSearch(undefined);
  }, [setParent, setSearch, folder.id]);
  return (
    <Tile
      icon={<FolderIcon fontSize="large" />}
      name={folder.name}
      onDoubleClick={setParentId}
    />
  );
};

export { FolderTile };
