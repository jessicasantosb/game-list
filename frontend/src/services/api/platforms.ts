import type { PlatformCreateRequest } from '../../schemas/platformCreate';
import type {
  PlatformGetAllResponse,
  PlatformResponse,
  PlatformUpdateRequest,
} from '../../types/Platform';
import type { BaseResponse, PaginationRequest } from '../../types/Shared';
import { api } from './api';

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

const create = async (data: PlatformCreateRequest) => {
  const result = await api.post<BaseResponse>('/platforms', data);
  return result.data;
};

const updateById = async ({ data, id }: PlatformUpdateRequest) => {
  console.log('update api ');

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
