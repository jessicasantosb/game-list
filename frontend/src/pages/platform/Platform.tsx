import { useState } from 'react';

import { CustomPagination } from '../../components/customPagination/CustomPagination';
import { Header } from '../../components/header/Header';
import HeaderList from '../../components/ui/headerList/HeaderList';
import ListItems from '../../components/ui/listItems/ListItems';
import { useDeletePlatform } from '../../hooks/data/usePlatformsMutations';
import { useFetchPlatforms } from '../../hooks/data/usePlatformsQueries';
import { formatDateYear } from '../../utils/formatDateYear';
import { per_page } from '../../utils/getPaginationItems';
import DeleteModal from '../components/DeleteModal';
import { CreatePlatform } from './forms/create/Create';
import { UpdatePlatform } from './forms/update/Update';

export type SortHeaders = {
  sort: string;
  label: string;
};

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

      <HeaderList fields={headers} onSortClick={handleSort} />

      <div className='itemsContainer'>
        <div>
          {platforms?.map((platform, index) => (
            <ListItems
              key={index}
              imageUrl={platform.image_url}
              camp1={platform.title}
              camp2={platform.company}
              camp3={formatDateYear(String(platform.acquisition_year))}
              camp4={formatDateYear(String(platform.createdAt))}
              camp5={formatDateYear(String(platform.updatedAt))}
              iconDetails
              iconEdit
              iconDelete
              editForm={<UpdatePlatform platform={platform} />}
              deleteForm={
                <DeleteModal
                  type='platform'
                  onDelete={() => deletePlatform.mutate(platform._id)}
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
};
