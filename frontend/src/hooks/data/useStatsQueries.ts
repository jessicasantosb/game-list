import { useQuery } from '@tanstack/react-query';

import { statsService } from '../../services/api/stats';

export const useFetchSummary = () => {
  return useQuery({
    queryKey: ['summary'],
    queryFn: statsService.summary,
  });
};
