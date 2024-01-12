import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import '../styles/ThreadCard.css';
import { Thread } from '../interfaces/Thread';

interface ThreadCardProps {
  thread: Thread;
}

const ThreadCard: React.FC<ThreadCardProps> = (prop) => {
  return (
    <Card className="thread-card" onClick={() => {}} size='sm'>
      <Typography level="title-lg">{prop.thread.title}</Typography>
      <Typography level="body-md">{prop.thread.content}</Typography>
      <Typography level="body-xs">{prop.thread.comment_count} comments</Typography>
      {prop.thread.is_edited && <Typography level="body-xs">Updated at: {new Date(prop.thread.updated_at).toLocaleString()}</Typography>}
      {!prop.thread.is_edited && <Typography level="body-xs">Created at: {new Date(prop.thread.created_at).toLocaleString()}</Typography>}
    </Card>
 );
};

export default ThreadCard;