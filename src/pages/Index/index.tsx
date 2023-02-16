import { DocumentViewer } from "../../components/DocumentViewer";
import { AddFolderModal } from "../../components/AddFolderModal";
import { AddFileModal } from "../../components/AddFileModal";
import { Grid, Typography } from "@mui/material";
import { SearchBox } from "../../components/SearchBox";
import { DocumentTotals } from "../../components/DocumentTotals";
import { DocumentBreadcrumbs } from "../../components/DocumentBreadcrumbs";

const App: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBox />
      </Grid>
      <Grid item>
        <AddFolderModal />
      </Grid>
      <Grid item xs={8}>
        <AddFileModal />
      </Grid>
      <Grid item xs={8}>
        <DocumentBreadcrumbs />
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="flex-end">
        <Typography
          component="span"
          sx={{ cursor: "pointer" }}
          onClick={() => window.history.back()}
        >
          Back
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DocumentViewer />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <DocumentTotals />
      </Grid>
    </Grid>
  );
};

export default App;
