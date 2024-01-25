import { Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Comment } from "../interfaces/Comment";
import EditCommentButton from "./EditCommentButton";
import DeleteCommentButton from "./DeleteCommentButton";

interface CommentEditDeleteRow {
  comment: Comment;
}


const ThreadEditDeleteRow: React.FC<CommentEditDeleteRow> = (props: CommentEditDeleteRow) => {
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
      {(signedIn && user?.uid === props.comment.user_id) &&
        <>
          <EditCommentButton comment={props.comment} />
          <DeleteCommentButton comment={props.comment} />
        </>
      }
    </Stack>
  )
}

export default ThreadEditDeleteRow;