import { useState, type ChangeEvent } from 'react';

import search from '../../assets/search.svg';
import { useFetchCategories } from '../../hooks/data/useCategoriesQueries';
import { Button } from '../ui/button/Button';
import { Input } from '../ui/input/Input';
import { Select, SelectGroup, SelectItem } from '../ui/select/Select';
import style from './Filterbar.module.css';

type Props = {
  onSearch: (filters: FiltersState) => Promise<void>;
  onClear: () => void;
};

export type FiltersState = {
  search: string;
  category: string;
  favorite: string;
};

export const GameFilters = ({ onSearch, onClear }: Props) => {
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    category: '',
    favorite: '',
  });
  const categories = useFetchCategories();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
    setFilters({ search: '', category: '', favorite: '' });
  };

  const handleClear = () => {
    setFilters({ search: '', category: '', favorite: '' });
    onClear();
  };

  return (
    <div className={style.filtercontainer}>
      <div className={style.querys}>
        <h3>Filters</h3>
        <Input
          type='text'
          name='search'
          variant='rounded'
          placeholder='Search Game'
          value={filters.search}
          onChange={handleChange}
        />

        <Select
          name='category'
          value={filters.category}
          variant='default'
          onChange={handleChange}>
          <SelectGroup>
            <SelectItem value='' disabled>
              Select Category
            </SelectItem>
            {categories.data?.categories.map((category) => (
              <SelectItem key={category.title} value={category.title}>
                {category.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </Select>

        <Select
          name='favorite'
          variant='default'
          value={filters.favorite}
          onChange={handleChange}>
          <SelectGroup>
            <SelectItem value='' disabled>
              Favorite status
            </SelectItem>
            <SelectItem value='true'>Yes</SelectItem>
            <SelectItem value='false'>No</SelectItem>
          </SelectGroup>
        </Select>
      </div>

      <div className={style.buttons}>
        <Button variant='gray' onClick={handleClear}>
          Clear
        </Button>
        <Button variant='turquoise' onClick={handleSearch}>
          <div className={style.searchbtn}>
            Search
            <img src={search} alt='Search' />
          </div>
        </Button>
      </div>
    </div>
  );
};
