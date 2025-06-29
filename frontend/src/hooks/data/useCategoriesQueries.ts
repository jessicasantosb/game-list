import { useQuery } from '@tanstack/react-query';

import { categoriesService } from '../../services/api/categories';
import type { PaginationRequest } from '../../types/Shared';

export const useFetchCategories = (params: PaginationRequest = {}) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoriesService.getAll(params),
  });
};
