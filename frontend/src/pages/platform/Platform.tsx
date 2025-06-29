import { useState } from 'react';

import { CreatePlatform } from './forms/Create';
import { CustomPagination } from '../../components/customPagination/CustomPagination';
import { Header } from '../../components/header/Header';
import { Dialog, DialogTrigger } from '../../components/ui/dialog/Dialog';
import { useDeletePlatform } from '../../hooks/data/usePlatformsMutations';
import { useFetchPlatforms } from '../../hooks/data/usePlatformsQueries';
import { formatDateYear } from '../../utils/formatDateYear';
import { per_page } from '../../utils/getPaginationItems';
import DeleteModal from '../components/DeleteModal';
import { UpdatePlatform } from './forms/Update';
import { Table, TableBody, TableButton, TableCell, TableHead, TableHeader, TableHeadFake, TableImage, TableRow } from '../../components/ui/table/Table';
import { truncateString } from '../../utils/truncateString';

import type { SortHeaders } from '../../types/Shared';

const headers: SortHeaders[] = [
  { sort: 'title', label: 'Title' },
  { sort: 'company', label: 'Company' },
  { sort: 'acquisition_year', label: 'Acquisition year' },
  { sort: 'createdAt', label: 'Created at' },
  { sort: 'updatedAt', label: 'Updated at' },
];

export const Platform = () => {
  const [page, setPage] = useState(1);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const [sort, setSort] = useState<string>('title');
  const deletePlatform = useDeletePlatform();

  const platformsQuery = useFetchPlatforms({ sort, dir, page, per_page });
  const platforms = platformsQuery.data?.platforms;
  const count = platformsQuery.data?.count;

  const totalPages = Math.ceil(Number(count) / per_page);

  const handleSort = (newSort: string) => {
    setSort(newSort);
    setDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className='container'>
      <Header
        title='Platforms'
        buttonText='NEW PLATFORM'
        createForm={<CreatePlatform />}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadFake />
            {headers.map(({ label, sort }) => (
              <TableHead key={label} onClick={() => handleSort(sort)}>
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {platforms?.map((platform) => (
            <TableRow key={platform._id}>
              <TableCell>
                <TableImage />
              </TableCell>
              <TableCell>{truncateString(platform.title)}</TableCell>
              <TableCell>{truncateString(platform.company)}</TableCell>
              <TableCell>{formatDateYear(platform.acquisition_year)}</TableCell>
              <TableCell>{formatDateYear(platform.createdAt)}</TableCell>
              <TableCell>{formatDateYear(platform.updatedAt)}</TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <TableButton formType='edit' />
                  </DialogTrigger>
                  <UpdatePlatform platform={platform} />
                </Dialog>
              </TableCell>
              
              <TableCell style={{ paddingInline: '0px' }}>
                <Dialog>
                  <DialogTrigger>
                    <TableButton formType='delete' />
                  </DialogTrigger>
                  <DeleteModal type='platform' onDelete={() => deletePlatform.mutate(platform._id)} />
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
