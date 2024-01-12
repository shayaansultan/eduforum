import { useLoaderData } from 'react-router-dom';
import ThreadCard from './ThreadCard'; // adjust the import path as needed
import '../interfaces/Thread'
import { Thread } from '../interfaces/Thread';


export const threadsLoader = async () => {
  const response = await fetch('http://localhost:8080/threads');
  const data = await response.json();
  return data;
}


const ThreadList = () => {
 const threads = useLoaderData() as Thread[];
//  console.log(threads)
 return (
   <div>
      {threads.map((thread: Thread) => (
        <ThreadCard key={thread.thread_id} thread={thread} />
      ))}
    </div>
 );
};

export default ThreadList;
