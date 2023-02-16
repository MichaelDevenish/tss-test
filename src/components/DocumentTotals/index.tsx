import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { documentAnalytics } from "../../state/Documents";

const DocumentTotals: React.FC = () => {
  const analytics = useRecoilValue(documentAnalytics);
  return (
    <Typography>
      Total: {analytics.files} files and {analytics.folders} folders
    </Typography>
  );
};

export { DocumentTotals };
