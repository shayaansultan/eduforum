import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { Comment } from '../interfaces/Comment';
import '../styles/CommentCard.css';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = (prop) => {
  return (
    <Card className="comment-card" size='sm'>
      <Typography level="title-sm">By: {prop.comment.username}</Typography>
      <Typography level="body-md"
        sx={{
          textWrap: 'wrap',
          wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >{prop.comment.content}</Typography>
      <Typography level="body-sm">
        {prop.comment.is_edited ? 'Updated at: ' : 'Created at: '}
        {new Date(prop.comment.is_edited ? prop.comment.updated_at : prop.comment.created_at).toLocaleString()}
      </Typography>
    </Card>
  );
};

export default CommentCard;