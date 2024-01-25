import { Button, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Select, Stack, Textarea, Option } from "@mui/joy";
import { Thread } from "../interfaces/Thread";
import { Edit } from "@mui/icons-material";
import { getThreadURL } from "../apiService";
import { useEffect, useState } from "react";
import { Category } from "../interfaces/Categories";

interface EditThreadButtonProps {
  thread: Thread;
  categories: Category[];
}

const EditThreadButton: React.FC<EditThreadButtonProps> = (props: EditThreadButtonProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    (props.categories as Category[]).find((category) => category.category_id === props.thread.category_id) as Category
  );

  useEffect(() => {
    setTitle(props.thread.title);
    setContent(props.thread.content);
  }, [props.thread])

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const allCategories = props.categories as Category[];


  const handleEditThread = async () => {
    console.log("Editing thread");
    const threadURL = getThreadURL(props.thread.thread_id.toString());
    console.log(threadURL);
    setLoading(true);
    const body = {
      thread_id: props.thread.thread_id,
      title,
      content,
      category_id: selectedCategory.category_id
    }
    const response = await fetch(threadURL, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      window.location.href = `/threads/${props.thread.thread_id}`;
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
            <DialogTitle>Edit Thread</DialogTitle>
            <DialogContent>
              Fill in the following form to edit your thread.
            </DialogContent>
            <DialogContent>
              Others will be able to see that the thread has been edited.
              <Divider sx={{ my: 1 }} />
            </DialogContent>
            <DialogContent>
              <ModalClose />
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  handleEditThread();
                }}
              >
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input defaultValue={title} onChange={(e) => setTitle(e.target.value)} required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea defaultValue={content} onChange={(e) => setContent(e.target.value)} minRows={3} maxRows={5} required />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={selectedCategory}
                      defaultValue={selectedCategory}
                      required
                    >
                      {allCategories.map((category) => (
                        <Option key={category.category_id} value={category} onClick={() => setSelectedCategory(category)}>{category.name}</Option>
                      ))
                      }
                    </Select>
                  </FormControl>
                  <Button type="submit" loading={loading} onClick={handleEditThread}>Submit</Button>
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