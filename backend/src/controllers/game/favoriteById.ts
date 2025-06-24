import { RequestHandler } from 'express';

import { gameServices } from '@/services';

type Params = { id: string };
type Body = { favorite: boolean };

type FavoriteProps = RequestHandler<Params, unknown, Body>;

export const favoriteById: FavoriteProps = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const result = await gameServices.favoriteById({ id, favorite });

  if (result instanceof Error) {
    res.status(501).json({ error: result.message });
    return;
  }

  res.status(200).json(result);
};
