import { Add } from "@mui/icons-material"
import { Button, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Modal, ModalClose, ModalDialog, Stack, Textarea } from "@mui/joy"
import { useEffect, useState } from "react";
import { postCommentURL } from "../apiService";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const NewCommentButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openResponseModal, setOpenResponseModal] = useState<boolean>(false);
  const [response, setResponse] = useState<String>("");
  const [content, setContent] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [signedIn, setSignedIn] = useState<boolean>(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setSignedIn(true)
    } else {
      setSignedIn(false)
    }
  }
    , [])

  onAuthStateChanged(auth, (user) => {
    if (user && !signedIn) {
      setSignedIn(true)
    } else if (!user && signedIn) {
      setSignedIn(false)
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const commentsURL = postCommentURL();
      const user_id = user?.uid;
      if (!user_id) {
        throw new Error("User not signed in");
      }
      const body = {
        content,
        user_id: user_id,
        thread_id: +window.location.pathname.split('/')[2],
      };
      console.log(body);
      const response = await fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setLoading(false);
      if (!response.ok) {
        setResponse("Something went wrong");
        throw new Error(response.statusText);
      }
      setResponse("Comment created successfully");
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setOpenResponseModal(true);
    }
  }

  return (
    <>
      <Button variant="solid" color="primary" startDecorator={<Add />} onClick={() => setOpenModal(true)}>
        Add new comment
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)} >
        <ModalDialog>
          {signedIn && <>
            <ModalClose />
            <DialogTitle>Create new comment</DialogTitle>
            <DialogContent>Create a new comment by filling out the form below.</DialogContent>
            <Divider />
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea onChange={(e) => setContent(e.target.value)} minRows={3} maxRows={5} required />
                </FormControl>
                <Button type="submit" variant="solid" color="primary" loading={loading}>
                  Submit
                </Button>
              </Stack>
            </form>
          </>
          }
          {!signedIn && <>
            <ModalClose />
            <DialogTitle>Sign in to comment</DialogTitle>
            <DialogContent>You must be signed in to comment.</DialogContent>
            <Divider />
            <Stack spacing={2}>
              <Button onClick={() => {
                window.location.href = "/login";
              }}>Sign in</Button>
            </Stack>
          </>}
        </ModalDialog>
      </Modal>
      <Modal open={openResponseModal} onClose={() => {
        setContent("");
        window.location.reload();
      }} >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Status</DialogTitle>
          <DialogContent>{response}</DialogContent>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default NewCommentButton