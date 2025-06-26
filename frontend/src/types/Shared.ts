export type PaginationRequest = {
  per_page?: number;
  page?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
};

export type BaseResponse = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
