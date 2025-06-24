import { RequestHandler } from 'express';

import { platformServices } from '@/services';

type Params = {
  id: string;
};

type Body = {
  image_url: string;
  title: string;
  company: string;
  acquisition_year: Date;
};

type UpdateProps = RequestHandler<Params, unknown, Body>;

export const updateById: UpdateProps = async (req, res) => {
  const { id } = req.params;
  const { image_url, title, company, acquisition_year } = req.body;

  const result = await platformServices.updateById({
    id,
    data: { image_url, title, company, acquisition_year },
  });

  if (result instanceof Error) {
    res.status(501).json({ error: result.message });
    return;
  }

  res.status(200).json(result);
};
