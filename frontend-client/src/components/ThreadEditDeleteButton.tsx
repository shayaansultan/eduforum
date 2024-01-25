import { Stack } from "@mui/joy";
import { Thread } from "../interfaces/Thread";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import DeleteThreadButton from "./DeleteThreadButton";

interface ThreadEditDeleteButtonProps {
  thread: Thread;
}


const ThreadEditDeleteRow: React.FC<ThreadEditDeleteButtonProps> = (props: ThreadEditDeleteButtonProps) => {
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
        <DeleteThreadButton thread={props.thread} />
      }
    </Stack>
  )
}

export default ThreadEditDeleteRow;