import { Box, Typography } from '@mui/joy';
import { Comment } from '../interfaces/Comment';
import CommentCard from './CommentCard';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = (prop) => {
  return (
    <div className="comment-list">
      {prop.comments.map((comment: Comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
      {prop.comments.length === 0 && 
        <Box display="flex" justifyContent={'space-evenly'} alignItems={'center'} p={1.5}>
          <Typography level="title-md">No comments yet</Typography>
        </Box>
      }
    </div>
  );
};

export default CommentList;