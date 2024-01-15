import { Comment } from "../interfaces/Comment";
import { Thread } from "../interfaces/Thread";
import CommentList from "../components/CommentList";
import { useLoaderData } from "react-router-dom";
import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/joy";
import { useColorScheme } from '@mui/joy/styles';
import '../styles/ThreadDetailPage.css';
import { Add } from "@mui/icons-material";


interface ThreadDetail {
  thread: Thread;
  comments: Comment[];
}

export const threadDetailPageLoader = async () => {
  const thread_id = window.location.pathname.split('/')[2];

  const commentsResponse = await fetch(`http://localhost:8080/threads/${thread_id}/comments`);
  const commentsData = await commentsResponse.json();

  const threadResponse = await fetch(`http://localhost:8080/threads/${thread_id}`);
  const threadData = await threadResponse.json();

  return { thread: threadData, comments: commentsData } as ThreadDetail;

};

const ThreadDetailPage = () => {
  const data = useLoaderData() as ThreadDetail;

  return (
    <>
      <Card className="thread-detail-card" 
        variant="plain" sx={{backgroundColor: useColorScheme().mode === "dark" ? "black" : "white"}}
      >
        <CardContent>
          <Typography level="h2">
            Title: {data.thread.title}
          </Typography>
          <Typography level="body-sm">
            Created by: {data.thread.username} at {new Date(data.thread.created_at).toLocaleString()}
          </Typography>
          <br />
          <Typography level="body-lg">
            {data.thread.content}
          </Typography>
        </CardContent>
      </Card>

      <Divider/>
      <Card className="comment-title-card" 
        variant="plain" sx={ {backgroundColor: useColorScheme().mode === "dark" ? "black" : "white", paddingTop: 0, paddingBottom: 0} }
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography level="h4">Comments</Typography>
            <Button variant="solid" color="primary" startDecorator={<Add />}>
              Add new comment
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <CommentList comments={data.comments} />
    </>
  );
};

export default ThreadDetailPage;