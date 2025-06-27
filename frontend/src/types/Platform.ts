import type { PlatformRequest } from '../schemas/platform';

export type PlatformResponse = {
  _id: string;
  image_url?: string;
  title: string;
  company?: string;
  acquisition_year?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  is_deleted?: boolean;
};

export type PlatformGetAllResponse = {
  platforms: PlatformResponse[];
  count: number;
};

export type PlatformUpdateRequest = {
  data: PlatformRequest;
  id: string;
};
