import { Stack, Typography, Card, useColorScheme } from "@mui/joy";
import NewThreadButton from "./NewThreadButton";
import SortThreadButton from "./SortThreadButton";
import '../styles/ThreadsHeader.css';
import { Categories } from "../interfaces/Categories";
import FilterCategoriesButton from "./FilterCategoriesButton";

interface ThreadsHeaderProps {
  categories: Categories[];
}

export const ThreadsHeader: React.FC<ThreadsHeaderProps> = (props) => {
  const categories = props.categories as Categories[];
  return (
    <Card
      className="threads-header-card"
      variant="plain"
      sx={{ backgroundColor: useColorScheme().mode === "dark" ? "black" : "white", paddingTop: 0, paddingBottom: 0 }}

    >
      <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'} display={'flex'}>
        <Typography level="h3">Threads</Typography>
        <Stack direction={'row'} spacing={2} >
          <NewThreadButton />
          <SortThreadButton />
          <FilterCategoriesButton categories={categories} />
        </Stack>
      </Stack>
    </Card>
  );
}