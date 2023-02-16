import { DocumentViewer } from "../../components/DocumentViewer";
import { AddFolderModal } from "../../components/AddFolderModal";
import { AddFileModal } from "../../components/AddFileModal";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid container spacing={4}>
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
}

export default App;

// todo  search
// todo stretch goals
// todo cleanup
