import { useQuery } from '@tanstack/react-query';

import { platformsService } from '../../services/api/platforms';
import type { PaginationRequest } from '../../types/Shared';

export const useFetchPlatforms = (params: PaginationRequest = {}) => {
  return useQuery({
    queryKey: ['platforms', params],
    queryFn: () => platformsService.getAll(params),
  });
};

export const useFetchPlatformById = (id: string) => {
  return useQuery({
    queryKey: ['platforms', id],
    queryFn: () => platformsService.getById(id),
  });
};
