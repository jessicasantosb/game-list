
import type { GameRequest } from '../../schemas/game';
import type {
  GameFavoriteRequest,
  GameGetAllResponse,
  GameResponse,
  GamesPaginationRequest,
  GameUpdateRequest,
} from '../../types/Game';
import type { BaseResponse } from '../../types/Shared';
import { api } from './api';

const getAll = async (params: GamesPaginationRequest) => {
  const result = await api.get<GameGetAllResponse>('/games', { params });
  return result.data;
};

const getById = async (id: string) => {
  const result = await api.get<GameResponse>(`/games/${id}`);
  return result.data;
};

const create = async (data: GameRequest) => {  
  const result = await api.post<BaseResponse>('/games', data);
  return result.data;
};

const updateById = async ({ data, id }: GameUpdateRequest) => {
  const result = await api.put<BaseResponse>(`/games/${id}`, data);
  return result.data;
};

const favoriteById = async ({ data, id }: GameFavoriteRequest) => {
  const result = await api.patch<BaseResponse>(`/games/${id}`, data);
  return result.data;
};

const deleteById = async (id: string) => {
  const result = await api.delete<void>(`/games/${id}`);
  return result.data;
};

export const gamesService = {
  getAll,
  getById,
  create,
  updateById,
  favoriteById,
  deleteById,
};
