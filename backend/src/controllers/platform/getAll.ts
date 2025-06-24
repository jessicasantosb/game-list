import { RequestHandler } from 'express';

import { platformServices } from '@/services';

type Query = {
  per_page: number;
  page: number;
  sort: string;
  dir: 'asc' | 'desc';
};

type Locals = {
  pagination: {
    per_page: number;
    page: number;
    sort: string;
    dir: 'asc' | 'desc';
  };
  user: {
    user_id: string;
  };
};

type GetAllProps = RequestHandler<unknown, unknown, unknown, Query, Locals>;

type GetAllValidatorProps = RequestHandler<
  unknown,
  unknown,
  unknown,
  Query,
  Locals
>;

export const getAllValidator: GetAllValidatorProps = (req, res, next) => {
  const { per_page, page, sort, dir } = req.query;

  const _per_page = typeof per_page === 'string' ? Number(per_page) : 10;
  const _page = typeof page === 'string' ? Number(page) : 1;
  const _sort = typeof sort === 'string' ? sort : 'title';
  const _dir = typeof dir === 'string' ? dir : 'asc';
  const _dirBoolean = _dir === 'asc' ? _dir : 'desc';

  res.locals.pagination = {
    per_page: _per_page,
    page: _page,
    sort: _sort,
    dir: _dirBoolean,
  };

  next();
};

export const getAll: GetAllProps = async (req, res) => {
  const { user_id } = res.locals.user;
  const { per_page, page, sort, dir } = res.locals.pagination;

  const platform = await platformServices.getAll({
    user_id,
    per_page,
    page,
    sort,
    dir,
  });

  if (platform instanceof Error) {
    res.status(400).json({ Error: platform.message });
    return;
  }

  res.status(200).json(platform);
};
