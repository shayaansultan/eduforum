import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { Comment } from '../interfaces/Comment';
import '../styles/CommentCard.css';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Card className="comment-card" size='sm'>
      <Typography level="body-md">{comment.username}</Typography>
      <Typography level="body-md">{comment.content}</Typography>
      <Typography level="body-sm">
        {comment.is_edited ? 'Updated at: ' : 'Created at: '}
        {new Date(comment.is_edited ? comment.updated_at : comment.created_at).toLocaleString()}
      </Typography>
    </Card>
  );
};

export default CommentCard;