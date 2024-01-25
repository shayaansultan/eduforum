import { Button, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Modal, ModalClose, ModalDialog, Stack, Textarea } from "@mui/joy";
import { Edit } from "@mui/icons-material";
import { commentsURL } from "../apiService";
import { useEffect, useState } from "react";
import { Comment } from "../interfaces/Comment";

interface EditCommentButtonProps {
  comment: Comment;
}

const EditThreadButton: React.FC<EditCommentButtonProps> = (props: EditCommentButtonProps) => {
  const comment = props.comment;
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setContent(props.comment.content);
  }, [props.comment])

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const handleCommentEdit = async () => {
    // console.log("Editing thread");
    const commentURL = commentsURL(comment.comment_id.toString());
    setLoading(true);
    const body = {
      comment_id: comment.comment_id,
      content,
    }
    const response = await fetch(commentURL, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      alert("Comment edited successfully");
      window.location.reload();
    } else {
      alert("Error editing thread");
      setLoading(false);
      setOpenModal(false);
    }

  }

  return (
    <>
      <Button variant='solid' color='primary' startDecorator={<Edit />}
        onClick={() => setOpenModal(true)}
      >
        Edit Thread
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog>
          <Stack direction="column" justifyContent="space-between" spacing={1.5}>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogContent>
              Fill in the following form to edit your comment.
            </DialogContent>
            <DialogContent>
              Others will be able to see that the comment has been edited.
              <Divider sx={{ my: 1 }} />
            </DialogContent>
            <DialogContent>
              <ModalClose />
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  handleCommentEdit();
                }}
              >
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea defaultValue={content} onChange={(e) => setContent(e.target.value)} minRows={3} maxRows={5} required />
                  </FormControl>
                  <Button type="submit" loading={loading} onClick={handleCommentEdit}>Submit</Button>
                </Stack>
              </form>
            </DialogContent>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default EditThreadButton;