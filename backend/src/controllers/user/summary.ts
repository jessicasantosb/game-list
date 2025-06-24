import { RequestHandler } from 'express';

import { userServices } from '@/services';

type Locals = {
  user: {
    user_id: string;
  };
};

type SummaryProps = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export const summary: SummaryProps = async (req, res) => {
  const { user_id } = res.locals.user;

  const result = await userServices.summary(user_id);

  if (result instanceof Error) {
    res.status(501).json({ error: result.message });
    return;
  }

  res.status(200).json(result);
};
