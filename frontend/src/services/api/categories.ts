import { api } from './api';

import type { CategoryRequest } from '../../schemas/category';
import type {
  CategoryGetAllResponse,
  CategoryUpdateRequest,
} from '../../types/Category';
import type { BaseResponse, PaginationRequest } from '../../types/Shared';

const getAll = async (params: PaginationRequest = {}) => {
  const result = await api.get<CategoryGetAllResponse>('/categories', {
    params,
  });
  return result.data;
};

const create = async (data: CategoryRequest) => {
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
