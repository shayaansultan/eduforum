import ThreadCard from './ThreadCard';
import { Thread } from '../interfaces/Thread';
import { Box, Typography } from '@mui/joy';

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = (prop) => {
//  console.log(threads)
 return (
   <div>
      {prop.threads.map((thread: Thread) => (
        <ThreadCard key={thread.thread_id} thread={thread} />
      ))}
      {prop.threads.length === 0 && 
        <Box display="flex" justifyContent={'space-evenly'} alignItems={'center'} p={1.5}>
          <Typography level="title-md">No comments yet</Typography>
        </Box>
      }
    </div>
 );
};

export default ThreadList;
