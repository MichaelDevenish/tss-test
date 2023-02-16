import { DocumentViewer } from "../../components/DocumentViewer";
import { AddFolderModal } from "../../components/AddFolderModal";
import { AddFileModal } from "../../components/AddFileModal";
import { Grid } from "@mui/material";
import { SearchBox } from "../../components/SearchBox";

const App: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBox />
      </Grid>
      <Grid item>
        <AddFolderModal />
      </Grid>
      <Grid item>
        <AddFileModal />
      </Grid>
      <Grid item xs={12}>
        <DocumentViewer />
      </Grid>
    </Grid>
  );
};

export default App;

// todo stretch goals
// todo cleanup
