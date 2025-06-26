import type { PaginationRequest } from "./Shared";

export type GameResponse = {
  _id?: string;
  image_url: string;
  title: string;
  description: string;
  category: string;
  platform: string;
  status: string;
  favorite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  acquisition_date: Date;
  finish_date: Date | null;
  is_deleted?: boolean;
};

export type GameGetAllResponse = {
  games: GameResponse[];
  count: number;
};

export type GameFavoriteRequest = { data: { favorite: boolean }; id: string };

export type GamesPaginationRequest = {
  params: PaginationRequest & {
    title: string;
    category: string;
    favorite: boolean;
  };
};