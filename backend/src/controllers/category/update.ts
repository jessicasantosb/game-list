import { RequestHandler } from 'express';

import { categoryService } from '@/services';

type Body = {
  title: string;
  description: string;
};

type Params = {
  id: string;
};

type UpdateByIdProps = RequestHandler<Params, unknown, Body>;

export const updateById: UpdateByIdProps = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!id) {
    res.status(400).json({ error: 'ID is required.' });
    return;
  }

  if (title && title.trim().length < 3) {
    res
      .status(400)
      .json({ error: 'Title must be at least 3 characters long.' });
    return;
  }

  const category = await categoryService.updateById({ id, title, description });

  if (category instanceof Error) {
    res.status(500).json({ error: category.message });
    return;
  }

  res.status(200).json(category);
};
