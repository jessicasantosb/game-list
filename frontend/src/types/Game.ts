import type { PaginationRequest } from './Shared';
import type { GameRequest } from '../schemas/game';

export type Status = 'Abandoned' | 'Done' | 'Playing';

export type GameResponse = {
  _id: string;
  image_url: string;
  title: string;
  description: string;
  category: string;
  platform: string;
  status: Status;
  favorite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  acquisition_date: Date;
  finish_date?: Date;
  is_deleted?: boolean;
};

export type GameGetAllResponse = {
  games: GameResponse[];
  count: number;
};

export type GameFavoriteRequest = { data: { favorite: boolean }; id: string };

export type GamesPaginationRequest = PaginationRequest & {
  title?: string;
  category?: string;
  favorite?: boolean;
};

export type GameUpdateRequest = {
  data: GameRequest;
  id: string;
};
