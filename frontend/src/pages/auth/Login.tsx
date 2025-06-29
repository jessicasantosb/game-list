import { type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import style from './Auth.module.css';
import { Button } from '../../components/ui/button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card/Card';
import { Input } from '../../components/ui/input/Input';
import { Label } from '../../components/ui/label/Label';
import { useSignIn } from '../../hooks/data/useUsersMutations';
import { signInSchema } from '../../schemas/signIn';
import { getDataForm } from '../../utils/getFormData';
import { logo } from '../../utils/icons';

export const Login = () => {
  const signin = useSignIn();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm({
      form: e.currentTarget,
      schema: signInSchema,
    });

    if (result.error) {
      toast.error('You must fill in all fields!');
      return;
    }

    signin.mutate(result.data, {
      onSuccess: () => toast.success('Login successful!'),
      onError: () => toast.error('Error logging in!'),
    });
  };

  return (
    <Card variant='auth'>
      <img src={logo} alt='Game List' className={style.logo} />

      <CardHeader>
        <div className={style.header}>
          <CardTitle className={style.title}>Login</CardTitle>
          <CardDescription className={style.subtitle}>
            Enter your credentials to access your account.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className={style.form}>
          <Label className={style.label}>
            Email
            <Input
              name='email'
              variant='squared'
              type='email'
              placeholder='Enter your email'
              style={{ width: 'auto', height: '44px' }}
            />
          </Label>
          <Label className={style.label}>
            Password
            <Input
              name='password'
              type='password'
              variant='squared'
              placeholder='Enter your password'
              style={{ width: 'auto', height: '44px' }}
            />
          </Label>

          {signin.error && (
            <span className={style.error}>{signin.error.message}</span>
          )}

          <Button type='submit' variant='turquoise' className={style.button}>
            LOGIN
          </Button>
        </form>
      </CardContent>

      <CardFooter className={style.footer}>
        <span>
          Don’t have an account?{' '}
          <Link to='/register'>
            {signin.isPending ? 'Loading...' : 'Register now'}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};
