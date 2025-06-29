import { api } from './api';

import type { PlatformRequest } from '../../schemas/platform';
import type {
  PlatformGetAllResponse,
  PlatformResponse,
  PlatformUpdateRequest,
} from '../../types/Platform';
import type { BaseResponse, PaginationRequest } from '../../types/Shared';

const getAll = async (params: PaginationRequest) => {
  const result = await api.get<PlatformGetAllResponse>('/platforms', {
    params,
  });
  return result.data;
};

const getById = async (id: string) => {
  const result = await api.get<PlatformResponse>(`/platforms/${id}`);
  return result.data;
};

const create = async (data: PlatformRequest) => {
  const result = await api.post<BaseResponse>('/platforms', data);
  return result.data;
};

const updateById = async ({ data, id }: PlatformUpdateRequest) => {
  const result = await api.put<BaseResponse>(`/platforms/${id}`, data);
  return result.data;
};

const deleteById = async (id: string) => {
  const result = await api.delete<void>(`/platforms/${id}`);
  return result.data;
};

export const platformsService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
