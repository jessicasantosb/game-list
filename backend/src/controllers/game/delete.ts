import { RequestHandler } from 'express';

import { gameServices } from '@/services';

type Params = {
  id: string;
};

type DeleteProps = RequestHandler<Params>;

export const deleteById: DeleteProps = async (req, res) => {
  const { id } = req.params;
  const result = await gameServices.deleteById({ id });

  if (result instanceof Error) {
    res.status(501).json({ error: result.message });
    return;
  }

  res.status(200).json(result);
};
