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
        Sort By{
          selectedSort === "date" ? ": Date" : ": Comments"
        }
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => {
          let params = Object.fromEntries(searchParams.entries());
          params.sort = "date";
          setSelectedSort("date")
          setSearchParams(params)
          }} selected={selectedSort === "date"}>
          Date
        </MenuItem>
        <MenuItem onClick={() => {
          let params = Object.fromEntries(searchParams.entries());
          params.sort = "comments";
          setSelectedSort("comments")
          setSearchParams(params)
          }} selected={selectedSort === "comments"}>
            No. of Comments
        </MenuItem>
        <MenuItem onClick={() => {
          let params = Object.fromEntries(searchParams.entries());
          params.asc = (!asc).toString();
          setAsc(!asc)
          setSearchParams(params)
          }} selected={asc}>
            Order: {asc ? "Ascending" : "Descending"}
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default SortThreadButton;