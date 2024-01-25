import { useEffect, useState } from "react";
import { Button, Modal, ModalDialog, DialogTitle, Stack, FormControl, FormLabel, Input, Textarea, IconButton, Divider, Typography, DialogContent, ModalClose, Select, Option } from '@mui/joy';
import { Add } from "@mui/icons-material";
import { getThreadsURL } from "../apiService";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Category } from "../interfaces/Categories";

interface NewThreadButtonProps {
  categories: Category[];
}


export const NewThreadButton: React.FC<NewThreadButtonProps> = (props) => {
  const allCategories = props.categories as Category[];

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openResponseModal, setOpenResponseModal] = useState<boolean>(false);
  const [response, setResponse] = useState<String>("");
  const [title, setTitle] = useState<String>("");
  const [content, setContent] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [lastThreadId, setLastThreadId] = useState<number>(-1);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(allCategories[0]);

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

    if (title.length > 100) {
      setLoading(false);
      setResponse("Title must be less than 100 characters");
      setOpenResponseModal(true);
      return;
    }

    try {
      const threadsURL = getThreadsURL();
      const user_id = user?.uid;
      if (!user_id) {
        throw new Error("User not signed in");
      }
      const body = {
        title,
        content,
        user_id: user_id,
        category_id: selectedCategory.category_id,
      };

      console.log(body);

      const response = await fetch(threadsURL, {
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
      const data = await response.json();
      setResponse(data.message);
      setLastThreadId(data.thread_id);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setOpenResponseModal(true);
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
          {signedIn && <>
            <ModalClose />
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
                  <Textarea onChange={(e) => setContent(e.target.value)} minRows={3} maxRows={5} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={selectedCategory}
                    placeholder={allCategories[0].name}
                    defaultValue={allCategories[0]}
                    required
                  >
                    {allCategories.map((category) => (
                      <Option key={category.category_id} value={category} onClick={() => setSelectedCategory(category)}>{category.name}</Option>
                    ))
                    }
                  </Select>
                </FormControl>
                <Button type="submit" loading={loading}>Submit</Button>
              </Stack>
            </form>
          </>}
          {!signedIn && <>
            <ModalClose />
            <DialogTitle>Sign in to create a thread</DialogTitle>
            <DialogContent>You must be signed in to create a thread</DialogContent>
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
        setResponse("")
        setTitle("")
        if (lastThreadId !== -1) {
          window.location.href = `/threads/${lastThreadId}`;
        }
        setOpenResponseModal(false);
      }}>
        <ModalDialog>
          <DialogContent>
            <ModalClose />
            <Typography level="h4">{response}</Typography>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </div>
  );
}

export default NewThreadButton;