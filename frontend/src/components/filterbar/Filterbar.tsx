import { useEffect, useState, type ChangeEvent } from 'react';

import search from '../../assets/search.svg';
import { useCategory } from '../../hooks/useCategory';
import type { CategoryProps } from '../../types/Category';
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
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    category: '',
    favorite: '',
  });
  const { getAll } = useCategory();

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

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAll({});
      setCategories(data);
    };

    fetchCategories();
  }, [getAll]);

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
            {categories?.map((cat) => (
              <SelectItem key={cat.title} value={cat.title}>
                {cat.title}
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
