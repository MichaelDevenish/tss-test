import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 } from "uuid";
import {
  documentParentState,
  documentStoreState,
  DocumentType,
} from "../../state/Documents";

interface FormState {
  name: string;
}

const AddFolderModal: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const parentId = useRecoilValue(documentParentState);
  const [documentList, setDocuments] = useRecoilState(documentStoreState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>();

  const closeModal = useCallback(() => {
    reset();
    setShowModal(false);
  }, [setShowModal, reset]);
  const openModal = useCallback(() => setShowModal(true), [setShowModal]);
  const onSubmit = useCallback(
    (data: FormState) => {
      setDocuments([
        ...documentList,
        {
          id: v4(),
          name: data.name,
          type: DocumentType.FOLDER,
          parentId,
        },
      ]);
      closeModal();
    },
    [documentList, setDocuments, closeModal, parentId]
  );

  return (
    <>
      <Button onClick={openModal} variant="outlined">
        Create New Folder
      </Button>
      <Dialog open={showModal} onClose={closeModal} fullWidth>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name", { required: "Name is required" })}
              required
              fullWidth
              variant="standard"
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AddFolderModal };
