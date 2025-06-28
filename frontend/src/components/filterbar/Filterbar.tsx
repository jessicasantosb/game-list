import { useState, type ChangeEvent } from 'react';
import search from '../../assets/search.svg';
import { useFetchCategories } from '../../hooks/data/useCategoriesQueries';
import { Button } from '../ui/button/Button';
import { Input } from '../ui/input/Input';
import { Select, SelectGroup, SelectItem } from '../ui/select/Select';
import style from './Filterbar.module.css';

type Props = {
  onSearch: (filters: FiltersState) => void;
  onClear: () => void;
};

export type FiltersState = {
  title?: string;
  category?: string;
  favorite?: boolean;
};

export const GameFilters = ({ onSearch, onClear }: Props) => {
  const [filters, setFilters] = useState<FiltersState>({});
  const categories = useFetchCategories();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => {
      if (name === 'favorite') {
        return {
          ...prev,
          favorite: value === '' ? undefined : value === 'true',
        };
      }

      return {
        ...prev,
        [name]: value === '' ? undefined : value,
      };
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  return (
    <div className={style.filtercontainer}>
      <div className={style.querys}>
        <h3 className={style.title}>Filters</h3>
        <Input
          type='text'
          name='title'
          variant='rounded'
          placeholder='Search Game'
          value={filters.title ?? ''}
          onChange={handleChange}
        />

        <Select
          name='category'
          value={filters.category ?? ''}
          variant='default'
          onChange={handleChange}>
          <SelectGroup>
            <SelectItem value='' disabled>
              Select Category
            </SelectItem>
            <SelectItem value=''>All</SelectItem>
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
          value={filters.favorite === undefined ? '' : String(filters.favorite)}
          onChange={handleChange}>
          <SelectGroup>
            <SelectItem value='' disabled>
              Select Favorite
            </SelectItem>
            <SelectItem value=''>All</SelectItem>
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
          Search
          <img src={search} alt='Search' />
        </Button>
      </div>
    </div>
  );
};
