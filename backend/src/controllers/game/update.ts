import { RequestHandler } from 'express';

import { gameServices } from '@/services';

type Params = {
  id: string;
};

type Body = {
  title: string;
  image_url: string;
  description: string;
  category: string;
  platform: string;
  status: string;
  favorite: boolean;
  acquisition_date: Date;
  finish_date: Date;
};

type UpdateProps = RequestHandler<Params, unknown, Body>;

export const updateById: UpdateProps = async (req, res) => {
  const { id } = req.params;
  const {
    image_url,
    title,
    description,
    category,
    platform,
    status,
    favorite,
    acquisition_date,
    finish_date,
  } = req.body;

  const result = await gameServices.updateById({
    id,
    data: {
      image_url,
      title,
      description,
      category,
      platform,
      status,
      favorite,
      acquisition_date,
      finish_date,
    },
  });

  if (result instanceof Error) {
    res.status(501).json({ error: result.message });
    return;
  }

  res.status(200).json(result);
};
