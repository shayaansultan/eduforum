import { Stack, Typography, Card, useColorScheme } from "@mui/joy";
import NewThreadButton from "./NewThreadButton";
import SortThreadButton from "./SortThreadButton";
import '../styles/ThreadsHeader.css';
import { Category } from "../interfaces/Categories";
import FilterCategoriesButton from "./FilterCategoriesButton";

interface ThreadsHeaderProps {
  categories: Category[];
}

export const ThreadsHeader: React.FC<ThreadsHeaderProps> = (props) => {
  const categories = props.categories as Category[];
  return (
    <Card
      className="threads-header-card"
      variant="plain"
      sx={{ backgroundColor: useColorScheme().mode === "dark" ? "black" : "white", paddingTop: 0, paddingBottom: 0 }}

    >
      <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'} display={'flex'}>
        <Typography level="h3">Threads</Typography>
        <Stack direction={'row'} spacing={2} >
          <NewThreadButton categories={categories} />
          <SortThreadButton />
          <FilterCategoriesButton categories={categories} />
        </Stack>
      </Stack>
    </Card>
  );
}