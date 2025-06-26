import { useQuery } from '@tanstack/react-query';

import { gamesService } from '../../services/api/games';
import type { GamesPaginationRequest } from '../../types/Game';

export const useFetchGames = (params: GamesPaginationRequest) => {
  return useQuery({
    queryKey: ['games', params],
    queryFn: () => gamesService.getAll(params),
  });
};

export const useFetchGameById = (id: string) => {
  return useQuery({
    queryKey: ['games', id],
    queryFn: () => gamesService.getById(id),
  });
};
