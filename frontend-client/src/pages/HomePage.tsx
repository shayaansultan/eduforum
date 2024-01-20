import { ThreadsHeader } from '../components/ThreadsHeader';
import { Thread } from '../interfaces/Thread';
import { useLoaderData } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import { getThreadsURL } from '../apiService';




export const homePageLoader = async () => {
  const URL = getThreadsURL();
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

const HomePage = () => {
  const data = useLoaderData() as Thread[];
  return (
   <div>
      <ThreadsHeader />
      <ThreadList threads={data} />
    </div>
 );
};

export default HomePage;
