import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CustomPagination } from '../../components/customPagination/CustomPagination';
import {
  GameFilters,
  type FiltersState,
} from '../../components/filterbar/Filterbar';
import { Header } from '../../components/header/Header';
import HeaderList from '../../components/ui/headerList/HeaderList';
import ListItems from '../../components/ui/listItems/ListItems';
import { useGame } from '../../hooks/useGame';
import type { GameProps } from '../../types/Game';
import { formatDate } from '../../utils/formatDate';
import { per_page } from '../../utils/getPaginationItems';
import DeleteModal from '../components/DeleteModal';
import { CreateGame } from './forms/create/Create';
import { DetailsGame } from './forms/details/Details';
import { UpdateGame } from './forms/update/Update';

export type SortHeaders = {
  sort: string;
  label: string;
};

const headers: SortHeaders[] = [
  { sort: 'title', label: 'Title' },
  { sort: 'category', label: 'Category' },
  { sort: 'createdAt', label: 'Created At' },
  { sort: 'updatedAt', label: 'Updated At' },
  { sort: 'favorite', label: 'Favorite' },
];

export function Games() {
  const [page, setPage] = useState(1);
  const [games, setGames] = useState<GameProps[]>([]);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const { getAll, toggleIsFavorite, remove, count } = useGame();

  const totalPages = Math.ceil(count / per_page);

  const fetchGames = async () => {
    const data = await getAll({ page, per_page });

    setGames(data);
  };

  const handleFilters = async ({
    search,
    category,
    favorite,
  }: FiltersState) => {
    const _favorite = favorite === 'true' ? true : false;

    const games = await getAll({
      title: search,
      category,
      favorite: _favorite,
    });

    setGames(games);
  };

  const handleClearFilters = () => {
    fetchGames();
  };

  const handleSortClick = async (sort: string) => {
    setDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    const games = await getAll({ sort, dir, page, per_page });

    setGames(games);
  };

  const handleStarClick = async (game: GameProps) => {
    if (!game._id) {
      toast.error('Game ID not found!');
      return;
    }
    try {
      await toggleIsFavorite(game._id, !game.favorite);
      toast.success(
        `Game ${game.favorite ? 'removed from favorites' : 'added to favorites'}!`,
      );
      await fetchGames();
    } catch (error) {
      console.log(error);
      toast.error('Error updating favorite');
    }
  };

  const handleDelete = async (id: string): Promise<boolean> => {
    try {
      await remove(id);
      toast.success('Game deleted successfully');
      fetchGames();
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Error deleting game');
      return false;
    }
  };

  useEffect(() => {
    fetchGames();
  }, [page]);

  return (
    <div className='container'>
      <Header
        title='Games'
        buttonText='NEW GAME'
        createForm={<CreateGame onCreated={fetchGames} />}>
        <GameFilters onSearch={handleFilters} onClear={handleClearFilters} />
      </Header>
      <HeaderList fields={headers} onSortClick={handleSortClick} />

      <div className='itemsContainer'>
        <div>
          {games?.map((game, index) => (
            <ListItems
              key={index}
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
                  updateForm={<UpdateGame game={game} onCreated={fetchGames} />}
                  deleteForm={
                    <DeleteModal
                      type='game'
                      onDelete={() =>
                        game._id
                          ? handleDelete(game._id)
                          : Promise.resolve(false)
                      }
                    />
                  }
                />
              }
              editForm={<UpdateGame game={game} onCreated={fetchGames} />}
              deleteForm={
                <DeleteModal
                  type='game'
                  onDelete={() =>
                    game._id ? handleDelete(game._id) : Promise.resolve(false)
                  }
                />
              }
              onStarClick={() => handleStarClick(game)}
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
