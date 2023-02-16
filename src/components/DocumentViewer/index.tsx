import { Grid, Stack } from "@mui/material";
import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { filteredDocumentState, DocumentType } from "../../state/Documents";
import { FileTile } from "./FileTile";
import { FolderTile } from "./FolderTile";
import type { File, Folder } from "../../state/Documents";

const Document: React.FC<{ document: File | Folder }> = ({ document }) => {
  switch (document.type) {
    case DocumentType.FILE:
      return <FileTile file={document} />;
    case DocumentType.FOLDER:
      return <FolderTile folder={document} />;
  }
};

const DocumentViewer: React.FC = () => {
  const documentList = useRecoilValue(filteredDocumentState);
  return (
    <Grid container spacing={2}>
      {documentList.map((document) => (
        <Grid item xs={2} key={document.id}>
          <Document document={document} />
        </Grid>
      ))}
    </Grid>
  );
};

export { DocumentViewer };
