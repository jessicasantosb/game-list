import { useMutation, useQueryClient } from '@tanstack/react-query';

import { gamesService } from '../../services/api/games';

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamesService.updateById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useFavoriteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamesService.favoriteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamesService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};
