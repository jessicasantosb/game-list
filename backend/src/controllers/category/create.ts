import { RequestHandler } from 'express';

import { categoryService } from '@/services';

import type { LocalsUser } from '@/controllers/types/locals';

type Locals = {
  user: LocalsUser;
};

type Body = {
  title: string;
  description: string;
};

type CreateProps = RequestHandler<unknown, unknown, Body, unknown, Locals>;

export const create: CreateProps = async (req, res) => {
  const { user_id } = res.locals.user;
  const { title, description } = req.body;

  if (!title || title.trim().length < 3) {
    res.status(400).json({ error: 'Name must contain at least 3 characters.' });
    return;
  }

  const category = await categoryService.create({
    user_id,
    title,
    description,
  });

  if (category instanceof Error) {
    res.status(500).json({ error: category.message });
    return;
  }

  res.status(201).json({ id: category });
};
