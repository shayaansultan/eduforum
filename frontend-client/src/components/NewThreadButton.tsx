import { useState } from "react";
import { Button, Box, Modal, ModalDialog, DialogTitle, DialogContent, Stack, FormControl, FormLabel, Input, Textarea } from '@mui/joy';

export const NewThreadButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div>
      <Button
        variant="solid"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add new thread
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog>
          <DialogTitle>Create new thread</DialogTitle>
          <DialogContent>
            Fill in the form below to create a new thread
          </DialogContent>
          <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  setOpenModal(false);
              }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea minRows={3} maxRows={5} />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

    </div>
  );
}

export default NewThreadButton;