import { useState } from 'react';

import { CustomPagination } from '../../components/customPagination/CustomPagination';
import {
  GameFilters,
  type FiltersState,
} from '../../components/filterbar/Filterbar';
import { Header } from '../../components/header/Header';
import HeaderList from '../../components/ui/headerList/HeaderList';
import ListItems from '../../components/ui/listItems/ListItems';
import {
  useDeleteGame,
  useFavoriteGame,
} from '../../hooks/data/useGamesMutations';
import { useFetchGames } from '../../hooks/data/useGamesQueries';
import type { GamesPaginationRequest } from '../../types/Game';
import type { SortHeaders } from '../../types/Shared';
import { formatDate } from '../../utils/formatDate';
import { per_page } from '../../utils/getPaginationItems';
import DeleteModal from '../components/DeleteModal';
import { CreateGame } from './forms/Create';
import { DetailsGame } from './forms/Details';
import { UpdateGame } from './forms/Update';

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
  console.log('games: ', games);

  const totalPages = Math.ceil(Number(count) / per_page);

  const handleSort = (newSort: string) => {
    setParams((prev) => ({
      ...prev,
      sort: newSort,
      dir: prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilters = ({ title, category, favorite }: FiltersState) => {
    setParams((prev) => ({
      ...prev,
      title,
      category,
      favorite: !favorite,
    }));
  };

  const handleClearFilters = () => {
    setParams((prev) => ({
      ...prev,
      title: '',
      category: '',
      favorite: false,
    }));

    gamesQuery.refetch();
  };

  return (
    <div className='container'>
      <Header title='Games' buttonText='NEW GAME' createForm={<CreateGame />}>
        <GameFilters onSearch={handleFilters} onClear={handleClearFilters} />
      </Header>
      <HeaderList fields={headers} onSortClick={handleSort} />

      <div className='itemsContainer'>
        {gamesQuery.isLoading && <p>Loading...</p>}
        <div>
          {games?.map((game) => (
            <ListItems
              key={game._id}
              imageUrl={game.image_url}
              camp1={game.title}
              camp2={game.category}
              camp3={formatDate(String(game.createdAt))}
              camp4={
                game.updatedAt !== game.createdAt
                  ? formatDate(String(game.updatedAt))
                  : ''
              }
              iconDetails
              iconEdit
              iconDelete
              iconStar
              isStarred={game.favorite}
              detailsForm={
                <DetailsGame
                  game={game}
                  updateForm={<UpdateGame game={game} />}
                  deleteForm={
                    <DeleteModal
                      type='game'
                      onDelete={() => deleteGame.mutate(String(game._id))}
                    />
                  }
                />
              }
              editForm={<UpdateGame game={game} />}
              deleteForm={
                <DeleteModal
                  type='game'
                  onDelete={() => deleteGame.mutate(String(game._id))}
                />
              }
              onStarClick={() =>
                favoriteGame.mutate({
                  id: String(game._id),
                  data: {
                    favorite: !game.favorite,
                  },
                })
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
