import { useEffect, useState } from "react";
import { Categories } from "../interfaces/Categories";
import { useSearchParams } from "react-router-dom";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { FilterList } from "@mui/icons-material";
import { stringify } from "querystring";
import { set } from "firebase/database";

interface FilterCategoriesButtonProps {
  categories: Categories[]
}

const FilterCategoriesButton: React.FC<FilterCategoriesButtonProps> = (props) => {
  const allCategories = props.categories as Categories[];
  const [selectedCategories, setSelectedCategories] = useState<Categories[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const exists = searchParams.has("categories");
  const selectedCategoryIds = searchParams.get("categories")?.split(",").map(Number) || [0];

  console.log(allCategories);
  console.log(selectedCategoryIds);

  useEffect(() => {
    if (exists && selectedCategoryIds[0] === 0) {
      let params = Object.fromEntries(searchParams.entries());
      delete params.categories;
      setSelectedCategories(allCategories);
      setSearchParams(params, { replace: true });
    }
    else if (selectedCategoryIds[0] !== 0) {
      setSelectedCategories(() => allCategories.filter((category) => {
        return selectedCategoryIds.includes(category.category_id);
      }));
    }
  }, [])


  console.log(selectedCategories);

  const handleCategoryClick = (category: Categories) => {
    let params = Object.fromEntries(searchParams.entries());
    let newCategories: number[] = [];
    if (params.categories) {
      newCategories = params.categories.split(",").map(Number);
    }

    if (newCategories.includes(category.category_id)) {
      newCategories = newCategories.filter((id) => {
        return id !== category.category_id;
      })
    } else {
      newCategories.push(category.category_id);
    }

    params.categories = newCategories.join(",");
    console.log(params);
    setSelectedCategories(() => allCategories.filter((category) => {
      return newCategories.includes(category.category_id);
    }));
    setSearchParams(params, { replace: true });

  }

  return (
    <Dropdown>
      <MenuButton variant="outlined" color="neutral" startDecorator={<FilterList />}>
        Filter By{
          // If one category is selected, display the category name
          // If multiple categories are selected, display "Multiple"
          // If no categories are selected, display nothing
          selectedCategories.length === 1 ? `: ${selectedCategories[0].name}` :
            selectedCategories.length > 1 ? ": Multiple" : ""
        }
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => {
          let params = Object.fromEntries(searchParams.entries());
          delete params.categories;
          setSelectedCategories([]);
          setSearchParams(params, { replace: true });
        }}>
          All
        </MenuItem>

        {allCategories.map((category) => {
          return (
            <MenuItem
              onClick={() => handleCategoryClick(category)}
              key={category.category_id}
              selected={selectedCategoryIds.includes(category.category_id)}
            >
              {category.name}
            </MenuItem>
          )
        })}
      </Menu>
    </Dropdown>
  )

}

export default FilterCategoriesButton;