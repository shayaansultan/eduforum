import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import '../styles/ThreadCard.css';
import { Thread } from '../interfaces/Thread';
import { Link } from '@mui/joy';

interface ThreadCardProps {
  thread: Thread;
}

const ThreadCard: React.FC<ThreadCardProps> = (prop) => {
  return (
    <Card className="thread-card" size='sm'>
      <Typography level="title-md">{prop.thread.title}</Typography>
      <Typography level="body-sm">{prop.thread.content}</Typography>
      <Typography level="body-xs">{prop.thread.comment_count} comments</Typography>
      <Link overlay href={`/threads/${prop.thread.thread_id}`} underline="none">
        {prop.thread.is_edited && <Typography level="body-xs">Updated at: {new Date(prop.thread.updated_at).toLocaleString()}</Typography>}
        {!prop.thread.is_edited && <Typography level="body-xs">Created at: {new Date(prop.thread.created_at).toLocaleString()}</Typography>}
      </Link>
    </Card>
  );
};

export default ThreadCard;
