import { ThreadsHeader } from '../components/ThreadsHeader';
import ThreadCard from '../components/ThreadCard';
import { Thread } from '../interfaces/Thread';
import { useLoaderData } from 'react-router-dom';




export const homePageLoader = async () => {
  const response = await fetch('http://localhost:8080/threads');
  const data = await response.json();
  return data;
}

const HomePage = () => {
  const data = useLoaderData() as Thread[];
  return (
   <div>
      <ThreadsHeader />
      {data.map((thread: Thread) => (
        <ThreadCard key={thread.thread_id} thread={thread} />
      ))}
    </div>
 );
};

export default HomePage;
