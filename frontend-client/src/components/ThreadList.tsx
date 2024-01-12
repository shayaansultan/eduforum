import ThreadCard from './ThreadCard'; // adjust the import path as needed
import '../interfaces/Thread'
import { Thread } from '../interfaces/Thread';




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
    </div>
 );
};

export default ThreadList;
