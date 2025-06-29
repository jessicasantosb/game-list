import { useState } from 'react';

import { CreateGame } from './forms/Create';
import { DetailsGame } from './forms/Details';
import { UpdateGame } from './forms/Update';
import { CustomPagination } from '../../components/customPagination/CustomPagination';
import {
  GameFilters,
  type FiltersState,
} from '../../components/filterbar/Filterbar';
import { Header } from '../../components/header/Header';
import { Dialog, DialogTrigger } from '../../components/ui/dialog/Dialog';
import {
  Table,
  TableBody,
  TableButton,
  TableCell,
  TableHead,
  TableHeader,
  TableHeadFake,
  TableImage,
  TableRow,
  TableStarButton,
} from '../../components/ui/table/Table';
import {
  useDeleteGame,
  useFavoriteGame,
} from '../../hooks/data/useGamesMutations';
import { useFetchGames } from '../../hooks/data/useGamesQueries';
import { formatDateYear } from '../../utils/formatDateYear';
import { per_page } from '../../utils/getPaginationItems';
import { truncateString } from '../../utils/truncateString';
import DeleteModal from '../components/DeleteModal';

import type { GamesPaginationRequest } from '../../types/Game';
import type { SortHeaders } from '../../types/Shared';

const headers: SortHeaders[] = [
  { sort: 'title', label: 'Title' },
  { sort: 'category', label: 'Category' },
  { sort: 'createdAt', label: 'Created At' },
  { sort: 'updatedAt', label: 'Updated At' },
  { sort: 'favorite', label: 'Favorite' },
];

export function Games() {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<GamesPaginationRequest>({
    per_page: 5,
    page: 1,
  });
  const deleteGame = useDeleteGame();
  const favoriteGame = useFavoriteGame();

  const gamesQuery = useFetchGames(params);
  const games = gamesQuery.data?.games;
  const count = gamesQuery.data?.count;

  const totalPages = Math.ceil(Number(count) / per_page);

  const handleSort = (newSort: string) => {
    setParams((prev) => ({
      ...prev,
      sort: newSort,
      dir: prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilters = (filters: FiltersState) => {
    setParams((prev) => ({
      ...prev,
      ...filters,
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      title: undefined,
      category: undefined,
      favorite: undefined,
    }));
  };

  return (
    <div className='container'>
      <Header title='Games' buttonText='NEW GAME' createForm={<CreateGame />} />
      <GameFilters onSearch={handleFilters} onClear={handleClearFilters} />

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
          {games?.map((game) => (
            <TableRow key={game._id}>
              <TableCell>
                <TableImage src={game.image_url} />
              </TableCell>
              <TableCell>{truncateString(game.title)}</TableCell>
              <TableCell>{truncateString(game.category)}</TableCell>
              <TableCell>{formatDateYear(game.createdAt)}</TableCell>
              <TableCell>{formatDateYear(game.updatedAt)}</TableCell>
              <TableCell>
                <TableStarButton
                  onClick={() =>
                    favoriteGame.mutate({
                      id: String(game._id),
                      data: {
                        favorite: !game.favorite,
                      },
                    })
                  }
                  isFavorite={game.favorite}
                />
              </TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <TableButton formType='view' />
                  </DialogTrigger>
                  <DetailsGame game={game} />
                </Dialog>
              </TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <TableButton formType='edit' />
                  </DialogTrigger>
                  <UpdateGame game={game} />
                </Dialog>
              </TableCell>

              <TableCell style={{ paddingLeft: '0px' }}>
                <Dialog>
                  <DialogTrigger>
                    <TableButton formType='delete' />
                  </DialogTrigger>
                  <DeleteModal
                    type='game'
                    onDelete={() => deleteGame.mutate(String(game._id))}
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
