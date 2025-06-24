import { RequestHandler } from 'express';

import { gameServices } from '@/services';

import type { LocalsUser } from '@/controllers/types/locals';

type Locals = {
  user: LocalsUser;
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

type CreateProps = RequestHandler<unknown, unknown, Body, unknown, Locals>;

export const create: CreateProps = async (req, res) => {
  const { user_id } = res.locals.user;
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

  const game = await gameServices.create({
    image_url,
    title,
    description,
    category,
    platform,
    status,
    favorite,
    acquisition_date,
    finish_date,
    user_id,
  });

  console.log(game);

  if (game instanceof Error) {
    res.status(501).json({ Error: game.message });
  }

  res.status(201).json(game);
};
