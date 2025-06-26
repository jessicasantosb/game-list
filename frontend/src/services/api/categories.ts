import type { CategoryCreateRequest } from '../../schemas/categoryCreate';
import type { CategoryUpdateRequest } from '../../schemas/categoryUpdate';
import type { CategoryGetAllResponse } from '../../types/Category';
import type { BaseResponse, PaginationRequest } from '../../types/Shared';
import { api } from './api';

const getAll = async (params: PaginationRequest = {}) => {
  const result = await api.get<CategoryGetAllResponse>('/categories', {
    params,
  });
  return result.data;
};

const create = async (data: CategoryCreateRequest) => {
  const result = await api.post<BaseResponse>('/categories', data);
  return result.data;
};

const updateById = async ({ data, id }: CategoryUpdateRequest) => {
  const result = await api.put<BaseResponse>(`/categories/${id}`, data);
  return result.data;
};

const deleteById = async (id: string) => {
  const result = await api.delete<void>(`/categories/${id}`);
  return result.data;
};

export const categoriesService = {
  getAll,
  create,
  updateById,
  deleteById,
};
