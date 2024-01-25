import { Button, DialogContent, DialogTitle, Modal, ModalDialog, Stack, } from "@mui/joy";
import { Delete } from "@mui/icons-material";
import { commentsURL } from "../apiService";
import { useState } from "react";
import { Comment } from "../interfaces/Comment";

interface DeleteCommentButtonProps {
  comment: Comment;
}

const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = (props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const commentURL = commentsURL(props.comment.comment_id.toString());

  const onDeleteComment = async () => {
    setLoading(true);

    const CommentDeleteResponse = await fetch(commentURL, {
      method: 'DELETE',
    });
    if (CommentDeleteResponse.ok) {
      alert("Comment deleted successfully");
      setOpenModal(false);
      setLoading(false);
      window.location.reload();
    } else {
      alert("Error deleting Comment");
      setLoading(false);
      setOpenModal(false);
    }
  }

  return (
    <>
      <Button
        variant='solid'
        color='danger'
        startDecorator={<Delete />}
        sx={{ color: 'error' }}
        onClick={() => setOpenModal(true)}
      >
        Delete Comment
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog>
          <Stack direction="column" justifyContent="space-between" spacing={1.5}>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this Comment?
            </DialogContent>
            <DialogContent>
              This action cannot be undone.
            </DialogContent>
            <DialogContent>
              Only the Comment creator can delete a Comment.
            </DialogContent>
            <br />
            <DialogContent>
              <Button
                variant='solid'
                color='danger'
                onClick={onDeleteComment}
                loading={loading}
              >
                Yes, Delete Comment
              </Button>
            </DialogContent>
            <DialogContent>
              <Button
                variant='outlined'
                color='neutral'
                onClick={() => setOpenModal(false)}
              >
                No, Cancel
              </Button>
            </DialogContent>
          </Stack>
        </ModalDialog >
      </Modal >
    </>
  );
}

export default DeleteCommentButton;