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
    </div>
  );
};

export default CommentList;