import { RequestHandler } from 'express';

import { platformServices } from '@/services';

import type { LocalsUser } from '@/controllers/types/locals';

type Locals = {
  user: LocalsUser;
};

type Body = {
  title: string;
  image_url?: string;
  company?: string;
  acquisition_year?: Date;
};

type CreateProps = RequestHandler<unknown, unknown, Body, unknown, Locals>;

export const create: CreateProps = async (req, res) => {
  const { user_id } = res.locals.user;
  const { image_url, title, company, acquisition_year } = req.body;

  const result = await platformServices.create({
    image_url,
    title,
    company,
    acquisition_year,
    user_id,
  });

  if (result instanceof Error) {
    res.status(501).json({ error: result.message });
    return;
  }

  res.status(201).json({ platform_id: result });
};
