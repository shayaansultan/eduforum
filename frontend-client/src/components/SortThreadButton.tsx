import { Button } from "@mui/joy";
import { Sort} from "@mui/icons-material";

const SortThreadButton = () => {
  return (
    <div>
      <Button variant="outlined" color="neutral" startDecorator={<Sort />}>
        Sort by
      </Button>
    </div>
  );
}

export default SortThreadButton;