import { ThreadsHeader } from '../components/ThreadsHeader';
import { Thread } from '../interfaces/Thread';
import { useLoaderData } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import { getThreadsURL } from '../apiService';
import { useSearchParams } from 'react-router-dom';

export const homePageLoader = async () => {
  const URL = getThreadsURL();
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

const HomePage = () => {
  const data = useLoaderData() as Thread[];
  const [searchParams, _] = useSearchParams();

  let sortType = searchParams.get("sort");
  const asc = searchParams.get("asc");

  if (sortType == null) {
    sortType = "date";
  }

  const sortedData = data.sort((a: Thread, b: Thread) => {
    if (sortType === "comments") {
      return b.comment_count - a.comment_count;
    } else if (sortType === "date") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else {
      return 0;
    }
  });

  if (asc === "true") {
    sortedData.reverse();
  }

  return (
   <div>
      <ThreadsHeader />
      <ThreadList threads={sortedData} />
    </div>
 );
};

export default HomePage;
