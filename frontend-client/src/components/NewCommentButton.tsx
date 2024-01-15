import { Add } from "@mui/icons-material"
import { Button, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Modal, ModalClose, ModalDialog, Stack, Textarea } from "@mui/joy"
import { useState } from "react";

const NewCommentButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openResponseModal, setOpenResponseModal] = useState<boolean>(false);
  const [response, setResponse] = useState<String>("");
  const [content, setContent] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try { 
      const response = await fetch("http://localhost:8080/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content, 
          user_id: 1,
          thread_id: +window.location.pathname.split('/')[2], 
        }),
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
        <ModalClose />
        <DialogTitle>Create new comment</DialogTitle>
        <DialogContent>Create a new comment by filling out the form below.</DialogContent>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea onChange={(e) => setContent(e.target.value)} minRows={3} maxRows={5} required/>
            </FormControl>
            <Button type="submit" variant="solid" color="primary" loading={loading}>
              Submit
            </Button>
          </Stack>
        </form>
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