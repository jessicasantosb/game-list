export type CategoryResponse = {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
};

export type CategoryGetAllResponse = {
  categories: CategoryResponse[];
  count: number;
};
