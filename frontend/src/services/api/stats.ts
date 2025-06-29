import type { SummaryResponse } from '../../types/Stats';
import { api } from './api';

const summary = async () => {
  const result = await api.get<SummaryResponse>('/summary');
  return result.data;
};

export const statsService = {
  summary,
};
