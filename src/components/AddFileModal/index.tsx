import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
  content: string;
}

const AddFileModal: React.FC = () => {
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
  }, [setShowModal]);
  const openModal = useCallback(() => setShowModal(true), [setShowModal]);
  const onSubmit = useCallback(
    (data: FormState) => {
      setDocuments([
        ...documentList,
        {
          id: v4(),
          name: data.name,
          type: DocumentType.FILE,
          content: data.content,
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
        Create New File
      </Button>
      <Dialog open={showModal} onClose={closeModal} fullWidth>
        <DialogTitle>New File</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={"column"} spacing={4}>
              <Grid item>
                <TextField
                  {...register("name", { required: "Name is required" })}
                  required
                  fullWidth
                  error={!!errors.name}
                  variant="standard"
                  label="Name"
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register("content", { required: "Content is required" })}
                  required
                  fullWidth
                  multiline
                  error={!!errors.content}
                  variant="standard"
                  label="Content"
                  helperText={errors.content?.message}
                />
              </Grid>
            </Grid>
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

export { AddFileModal };
