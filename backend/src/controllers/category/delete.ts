import { RequestHandler } from 'express';

import { categoryService } from '@/services';

type Params = {
  id: string;
};

type DeleteProps = RequestHandler<Params>;

export const deleteById: DeleteProps = async (req, res) => {
  const { id } = req.params;

  const result = await categoryService.deleteById(id);

  if (result instanceof Error) {
    res.status(500).json({ error: result.message });
    return;
  }

  res.status(200).json(result);
};
