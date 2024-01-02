import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import './Thread';
import '../styles/ThreadCard.css';




const ThreadCard: React.FC<Thread> = (thread) => {
 return (
   <Card className="thread-card" onClick={() => {}}>
     <Typography level="h4">{thread.title}</Typography>
     <Typography level="body-md">{thread.subtitle}</Typography>
     <Typography level="body-sm">{thread.commentCount} comments</Typography>
     <Typography level="body-sm">Created at: {thread.createdAt.toLocaleString()}</Typography>
   </Card>
 );
};

export default ThreadCard;