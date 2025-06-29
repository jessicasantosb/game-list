import { useState } from 'react';

import { CustomPagination } from '../../components/customPagination/CustomPagination';
import { Header } from '../../components/header/Header';
import { Dialog, DialogTrigger } from '../../components/ui/dialog/Dialog';
import { useDeleteCategory } from '../../hooks/data/useCategoriesMutations';
import { useFetchCategories } from '../../hooks/data/useCategoriesQueries';
import { per_page } from '../../utils/getPaginationItems';
import DeleteModal from '../components/DeleteModal';
import { CreateCategory } from './forms/Create';
import { UpdateCategory } from './forms/Update';
import {
  Table,
  TableBody,
  TableButton,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table/Table';
import { formatDateYear } from '../../utils/formatDateYear';
import { truncateString } from '../../utils/truncateString';

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

      <Table>
        <TableHeader>
          {headers.map(({ label, sort }) => (
            <TableHead key={label} onClick={() => handleSort(sort)}>
              {label}
            </TableHead>
          ))}
        </TableHeader>

        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{truncateString(category.title)}</TableCell>
              <TableCell>{truncateString(category.description)}</TableCell>
              <TableCell>{formatDateYear(category.createdAt)}</TableCell>
              <TableCell>{formatDateYear(category.updatedAt)}</TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <TableButton formType='edit' />
                  </DialogTrigger>
                  <UpdateCategory category={category} />
                </Dialog>
              </TableCell>

              <TableCell style={{ paddingInline: '0px' }}>
                <Dialog>
                  <DialogTrigger>
                    <TableButton formType='delete' />
                  </DialogTrigger>
                  <DeleteModal
                    type={'category'}
                    onDelete={() => deleteCategory.mutate(category._id)}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
