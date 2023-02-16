import { Typography } from "@mui/material";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  documentParentState,
  documentPath,
  documentSearchState,
} from "../../state/Documents";

const DocumentBreadcrumbs: React.FC = () => {
  const breadcrumbs = useRecoilValue(documentPath);
  const [, setParent] = useRecoilState(documentParentState);
  const [, setSearch] = useRecoilState(documentSearchState);

  const setParentId = useCallback(
    (parentId?: string | null) => {
      setParent(parentId);
      setSearch(undefined);
    },
    [setParent, setSearch]
  );

  return (
    <>
      <Typography
        component="span"
        sx={{ cursor: "pointer", overflow: "hidden", display: "inline-block" }}
        onClick={() => setParentId(null)}
      >
        Home
      </Typography>
      {breadcrumbs.map((breadcrumb) => {
        return (
          <Typography
            key={breadcrumb.id}
            component="span"
            sx={{
              cursor: "pointer",
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "inline-block",
            }}
            onClick={() => setParentId(breadcrumb.id)}
          >
            &nbsp;&#x2f;&nbsp;{breadcrumb.name}
          </Typography>
        );
      })}
    </>
  );
};

export { DocumentBreadcrumbs };
