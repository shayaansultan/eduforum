import { ThreadsHeader } from '../components/ThreadsHeader';
import { Thread } from '../interfaces/Thread';
import { useLoaderData } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import { getAllCategoriesURL, getThreadsURL } from '../apiService';
import { useSearchParams } from 'react-router-dom';
import { Category } from '../interfaces/Categories';

export const homePageLoader = async () => {
  const threadsURL = getThreadsURL();
  const response = await fetch(threadsURL);
  const threads = await response.json();
  const categoriesURL = getAllCategoriesURL();
  const categoriesResponse = await fetch(categoriesURL);
  const categories = await categoriesResponse.json();
  return { threads, categories };
}

const HomePage = () => {
  const data = useLoaderData() as { threads: Thread[], categories: Category[] };
  const threads = data.threads as Thread[];
  const categories = data.categories as Category[];
  const [searchParams, _] = useSearchParams();

  let sortType = searchParams.get("sort");
  const asc = searchParams.get("asc");
  const categoryIds = searchParams.get("categories")?.split(",").map(Number) || [0];

  if (sortType == null) {
    sortType = "date";
  }

  let sortedData = threads.sort((a: Thread, b: Thread) => {
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

  if (categoryIds[0] !== 0) {
    sortedData = sortedData.filter((thread) => {
      return categoryIds.includes(thread.category_id);
    });
  }

  return (
    <div>
      <ThreadsHeader categories={categories} />
      <ThreadList threads={sortedData} />
    </div>
  );
};

export default HomePage;
