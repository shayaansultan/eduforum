import { Button, DialogContent, DialogTitle, Modal, ModalDialog, Stack, } from "@mui/joy";
import { Thread } from "../interfaces/Thread";
import { Delete } from "@mui/icons-material";
import { getCommentsForThreadURL, getThreadsURL } from "../apiService";
import { useState } from "react";

interface DeleteThreadButtonProps {
  thread: Thread;
}

const DeleteThreadButton: React.FC<DeleteThreadButtonProps> = (props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const threadCommentsURL = getCommentsForThreadURL(props.thread.thread_id.toString());
  const threadsURL = getThreadsURL();
  const thread = props.thread;

  const onDeleteThread = async () => {
    const threadCommentsResponse = await fetch(threadCommentsURL, {
      method: 'DELETE',
    });

    if (!threadCommentsResponse.ok) {
      alert("Error deleting thread comments. Thus cannot delete threads");
      setLoading(false);
      setOpenModal(false);
      return;
    }

    const threadDeleteResponse = await fetch(threadsURL + `/${thread.thread_id}`, {
      method: 'DELETE',
    });
    if (threadDeleteResponse.ok) {
      setOpenModal(false);
      window.location.href = '/';
    } else {
      alert("Error deleting thread");
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
        Delete Thread
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog>
          <Stack direction="column" justifyContent="space-between" spacing={1.5}>
            <DialogTitle>Delete Thread</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this thread?
            </DialogContent>
            <DialogContent>
              This action cannot be undone.
            </DialogContent>
            <DialogContent>
              PS: Deleting a thread will also delete all comments associated with it.
            </DialogContent>
            <DialogContent>
              Only the thread creator can delete a thread.
            </DialogContent>
            <br />
            <DialogContent>
              <Button
                variant='solid'
                color='danger'
                onClick={onDeleteThread}
                loading={loading}
              >
                Yes, Delete Thread
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

export default DeleteThreadButton;