import { Dropdown, Menu, MenuItem, MenuButton} from "@mui/joy";
import { Sort } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SortThreadButton = () => {
  const [selectedSort, setSelectedSort] = useState("date");
  const [searchParams, setSearchParams] = useSearchParams();
  const [asc, setAsc] = useState(false);
  const sortType = searchParams.get("sort");
  const ascType = searchParams.get("asc");

  useEffect(() => {
    if (sortType != null) {
      setSelectedSort(sortType);
    }
    if (ascType != null) {
      setAsc(ascType === "true");
    }
  }, [sortType])


  return (
    <Dropdown>
      <MenuButton variant="outlined" color="neutral" startDecorator={<Sort />}>
        Sort by: {selectedSort}
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => {
          setSelectedSort("date")
          setSearchParams({sort: "date"})
          }} selected={selectedSort === "date"}>
          Date
        </MenuItem>
        <MenuItem onClick={() => {
          setSelectedSort("comments")
          setSearchParams({sort: "comments"})
          }} selected={selectedSort === "comments"}>
            Comments
          </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default SortThreadButton;