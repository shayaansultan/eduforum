import { Box } from "@mui/joy";
import NewThreadButton from "./NewThreadButton";

export const NewSortFilter = () => {
  return (
    <Box display="flex" justifyContent={'space-evenly'} alignItems={'center'} p={1.5}>
      <NewThreadButton />
    </Box>
  );
}