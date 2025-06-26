import type { Pagination } from './Shared';

export type GameResponse = {
  _id: string;
  title: string;
  image_url?: string;
  description?: string;
  category: string;
  platform: string;
  status: 'playing' | 'done' | 'abandoned';
  favorite: boolean;
  acquisition_date?: string;
  finish_date: string | null;
  user_id: string;
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type GameGetAllResponse = {
  games: GameResponse[];
  total_games: number;
  pagination: Pagination;
};

export type GameFavoriteRequest = { data: { favorite: boolean }; id: string };

// export type GameProps = {
//   _id?: string;
//   image_url: string;
//   title: string;
//   description: string;
//   category: string;
//   platform: string;
//   status: string;
//   favorite?: boolean;
//   createdAt?: Date;
//   updatedAt?: Date;
//   acquisition_date: Date;
//   finish_date: Date | null;
//   is_deleted?: boolean;
// };

// export type EditGameProps = {
//   itemId: string;
//   gameData: Omit<
//     GameProps,
//     '_id' | 'createdAt' | 'updatedAt' | 'is_deleted' | 'favorite'
//   >;
// };

// export type EditGamesWithOnCreatedProps = {
//   onCreated: () => void;
//   game: GameProps;
// };
