import { Comment } from "../interfaces/Comment";
import { Thread } from "../interfaces/Thread";
import CommentList from "../components/CommentList";
import { useLoaderData } from "react-router-dom";
import { Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/joy";
import { useColorScheme } from '@mui/joy/styles';
import '../styles/ThreadDetailPage.css';
import NewCommentButton from "../components/NewCommentButton";
import { getAllCategoriesURL, getCommentsForThreadURL, getThreadURL } from "../apiService";
import ThreadEditDeleteRow from "../components/ThreadEditDeleteButton";
import { Category } from "../interfaces/Categories";


interface ThreadDetail {
  thread: Thread;
  comments: Comment[];
  categories: Category[];
}

export const threadDetailPageLoader = async () => {
  const thread_id = window.location.pathname.split('/')[2];
  const commentsURL = getCommentsForThreadURL(thread_id);
  const threadURL = getThreadURL(thread_id);
  const categoriesURL = getAllCategoriesURL();

  const commentsResponse = await fetch(commentsURL);
  const commentsData = await commentsResponse.json();

  const threadResponse = await fetch(threadURL);
  const threadData = await threadResponse.json();

  const categoriesResponse = await fetch(categoriesURL);
  const categoriesData = await categoriesResponse.json();

  return { thread: threadData, comments: commentsData, categories: categoriesData } as ThreadDetail;

};

const ThreadDetailPage = () => {
  const data = useLoaderData() as ThreadDetail;

  return (
    <>
      <Card className="thread-detail-card"
        variant="plain" sx={{ backgroundColor: useColorScheme().mode === "dark" ? "black" : "white" }}
      >
        <CardContent>
          <Typography level="h2"
            sx={{
              textWrap: 'wrap',
              wordWrap: 'break-word',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            Title: {data.thread.title}
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Chip size='md' sx={{ my: 1 }}>{data.thread.category_name}</Chip>
            <ThreadEditDeleteRow thread={data.thread} categories={data.categories} />
          </Stack>
          <Typography level="body-sm">
            Created by: {data.thread.username} at {new Date(data.thread.created_at).toLocaleString()}
          </Typography>
          {data.thread.is_edited && (
            <Typography level="body-sm">
              Edited at {new Date(data.thread.updated_at).toLocaleString()}
            </Typography>)
          }
          <br />
          <Typography level="body-md"
            sx={{
              textWrap: 'wrap',
              wordWrap: 'break-word',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {data.thread.content}
          </Typography>
        </CardContent>
      </Card>

      <Divider />
      <Card className="comment-title-card"
        variant="plain" sx={{ backgroundColor: useColorScheme().mode === "dark" ? "black" : "white", paddingTop: 0, paddingBottom: 0 }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography level="h4">Comments</Typography>
            <NewCommentButton />
          </Stack>
        </CardContent>
      </Card>
      <CommentList comments={data.comments} />
    </>
  );
};

export default ThreadDetailPage;