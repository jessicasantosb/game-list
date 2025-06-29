import { api } from './api';

import type { SummaryResponse } from '../../types/Stats';

const summary = async () => {
  const result = await api.get<SummaryResponse>('/summary');
  return result.data;
};

export const statsService = {
  summary,
};
