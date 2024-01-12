import { Comment } from '../interfaces/Comment';
import CommentCard from './CommentCard';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map(comment => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;