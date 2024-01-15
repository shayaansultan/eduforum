import { useState } from "react";
import { Button, Modal, ModalDialog, DialogTitle, Stack, FormControl, FormLabel, Input, Textarea, IconButton, Divider, Typography, DialogContent } from '@mui/joy';
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Thread } from "../interfaces/Thread";


export const NewThreadButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openResponseModal, setOpenResponseModal] = useState<boolean>(false);
  const [response, setResponse] = useState<String>("");
  const [title, setTitle] = useState<String>("");
  const [content, setContent] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content, 
          user_id: 1,
          category_id: 1, 
        }),
      });
      setLoading(false);
      const data = await response.json();
      setResponse(data.message);
      if (!response.ok) {
        throw new Error(data.message);
      }

      setOpenResponseModal(true);

      const navigate = useNavigate();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {window.outerWidth > 768 ? <Button variant="solid" color="primary" onClick={() => setOpenModal(true)} startDecorator={<Add />}>
        Add new thread
      </Button> : 
      <IconButton variant="solid" color="primary" onClick={() => setOpenModal(true)}>
        <Add />
      </IconButton>
      }
      <Modal open={openModal} onClose={() => setOpenModal(false)} >
        <ModalDialog>
          <DialogTitle>Create new thread</DialogTitle>
          <DialogContent>Create a new thread by filling out the form below.</DialogContent>
          <Divider />
          <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  handleSubmit(event);
              }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input onChange={(e) => setTitle(e.target.value)} required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea onChange={(e) => setContent(e.target.value)} minRows={3} maxRows={5} required/>
              </FormControl>
              <Button type="submit" loading={loading}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <Modal open={openResponseModal} onClose={async () => {
          setResponse("")
          setTitle("")
          // setOpenResponseModal(false);
          // setOpenModal(false);
          const response = await fetch("http://localhost:8080/threads/recent", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json() as Thread;
          const thread_id = data.thread_id;
          window.location.href = `/threads/${thread_id}`;
        }}>
        <ModalDialog>
          <DialogTitle>
            <Typography level="h4">{response}</Typography>
          </DialogTitle>
        </ModalDialog>
      </Modal>
    </div>
  );
}

export default NewThreadButton;