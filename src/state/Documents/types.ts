enum DocumentType {
  FILE,
  FOLDER,
}

interface Document {
  id: string;
  name: string;
  parentId?: string | null;
}

interface File extends Document {
  type: DocumentType.FILE;
  content: string;
}

interface Folder extends Document {
  type: DocumentType.FOLDER;
}

export type { Document, File, Folder };
export { DocumentType };
