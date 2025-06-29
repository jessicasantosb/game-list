import type { CategoryRequest } from '../schemas/category';

export type CategoryResponse = {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  is_deleted: boolean;
};

export type CategoryGetAllResponse = {
  categories: CategoryResponse[];
  count: number;
};

export type CategoryUpdateRequest = {
  data: CategoryRequest;
  id: string;
};
