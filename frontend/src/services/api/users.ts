import { api } from './api';

import type { SignInRequest } from '../../schemas/signIn';
import type { SignUpRequest } from '../../schemas/signUp';

const signup = async (data: SignUpRequest) => {
  const result = await api.post('/register', data);

  return result.data;
};

const signin = async ({ email, password }: SignInRequest) => {
  const credentials = `${email}:${password}`;
  const base64Credentials = btoa(credentials);
  const authorizationHeader = `Basic ${base64Credentials}`;

  const result = await api.post<string>(
    '/login',
    {},
    { headers: { Authorization: authorizationHeader } },
  );

  return result.data;
};

export const usersService = {
  signin,
  signup,
};
