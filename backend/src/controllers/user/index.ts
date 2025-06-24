import * as login from './login';
import * as register from './register';
import * as summary from './summary';

export const userControllers = {
  ...register,
  ...login,
  ...summary,
};
