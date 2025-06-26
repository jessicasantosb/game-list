import { useState } from 'react';

import { CustomPagination } from '../../components/customPagination/CustomPagination';
import { Header } from '../../components/header/Header';
import HeaderList from '../../components/ui/headerList/HeaderList';
import ListItems from '../../components/ui/listItems/ListItems';
import { useDeleteCategory } from '../../hooks/data/useCategoriesMutations';
import { useFetchCategories } from '../../hooks/data/useCategoriesQueries';
import { formatDate } from '../../utils/formatDate';
import { per_page } from '../../utils/getPaginationItems';
import DeleteModal from '../components/DeleteModal';
import { CreateCategory } from './forms/Create';
import { UpdateCategory } from './forms/Update';
import type { SortHeaders } from '../../types/Shared';

const headers: SortHeaders[] = [
  { sort: 'title', label: 'Title' },
  { sort: 'description', label: 'Description' },
  { sort: 'createdAt', label: 'Created At' },
  { sort: 'updatedAt', label: 'Updated At' },
];

export function Category() {
  const [page, setPage] = useState(1);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const [sort, setSort] = useState<string>('title');
  const deleteCategory = useDeleteCategory();

  const categoriesQuery = useFetchCategories({ sort, dir, page, per_page });
  const categories = categoriesQuery.data?.categories;
  const count = categoriesQuery.data?.count;

  const totalPages = Math.ceil(Number(count) / per_page);

  const handleSort = (newSort: string) => {
    setSort(newSort);
    setDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className='container'>
      <Header
        title='Categories'
        buttonText='NEW CATEGORY'
        createForm={<CreateCategory />}
      />

      <HeaderList fields={headers} onSortClick={handleSort} />

      <div className='itemsContainer'>
        {categoriesQuery.isLoading && <p>Loading...</p>}
        <div>
          {categories?.map((category) => (
            <ListItems
              key={category._id}
              camp1={category.title}
              camp2={category.description}
              camp3={formatDate(String(category.createdAt))}
              camp4={formatDate(String(category.updatedAt))}
              iconEdit
              iconDelete
              editForm={<UpdateCategory category={category} />}
              deleteForm={
                <DeleteModal
                  type={'category'}
                  onDelete={() => deleteCategory.mutate(category._id)}
                />
              }
            />
          ))}
        </div>

        <CustomPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
