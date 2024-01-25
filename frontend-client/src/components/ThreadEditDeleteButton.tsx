import { Stack } from "@mui/joy";
import { Thread } from "../interfaces/Thread";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import DeleteThreadButton from "./DeleteThreadButton";
import EditThreadButton from "./EditThreadButton";
import { Category } from "../interfaces/Categories";

interface ThreadEditDeleteRowProps {
  thread: Thread;
  categories: Category[];
}


const ThreadEditDeleteRow: React.FC<ThreadEditDeleteRowProps> = (props: ThreadEditDeleteRowProps) => {
  const [signedIn, setSignedIn] = useState<boolean>(false)

  const user = auth.currentUser;
  useEffect(() => {
    if (user && !signedIn) {
      // User is signed in
      setSignedIn(true)
    }
    else if (!user && signedIn) {
      // User is signed out
      setSignedIn(false)
    }
  }
    , [user])

  onAuthStateChanged(auth, (user) => {
    if (user && !signedIn) {
      // User is signed in
      setSignedIn(true)
    } else if (!user && signedIn) {
      // User is signed out
      setSignedIn(false)
    }
  });

  return (
    <Stack direction="row" spacing={1}>
      {(signedIn && user?.uid === props.thread.user_id) &&
        <>
          <EditThreadButton thread={props.thread} categories={props.categories} />
          <DeleteThreadButton thread={props.thread} />
        </>
      }
    </Stack>
  )
}

export default ThreadEditDeleteRow;