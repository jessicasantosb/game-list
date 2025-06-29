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
import { useSignUp } from '../../hooks/data/useUsersMutations';
import { signUpSchema, type SignUpRequest } from '../../schemas/signUp';
import { getDataForm } from '../../utils/getFormData';
import { logo } from '../../utils/icons';

export const Register = () => {
  const signup = useSignUp();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = getDataForm<SignUpRequest>({
      form: e.currentTarget,
      schema: signUpSchema,
    });

    if (result.error) {
      toast.error('You must fill in all fields!');
      return;
    }

    signup.mutate(result.data);
  };

  return (
    <Card variant='auth'>
      <img src={logo} alt='Game List' className={style.logo} />
      <CardHeader>
        <div className={style.header}>
          <CardTitle className={style.title}>Sign Up</CardTitle>
          <CardDescription className={style.subtitle}>
            Register yourself to access the system
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className={style.form}>
          <Label className={style.label}>
            Full Name
            <Input
              name='full_name'
              variant='squared'
              type='text'
              placeholder='Enter your name'
              style={{ width: 'auto', height: '44px' }}
            />
          </Label>

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

          <Label className={style.label}>
            Confirm Password
            <Input
              name='confirm_password'
              type='password'
              variant='squared'
              placeholder='Confirm your password'
              style={{ width: 'auto', height: '44px' }}
            />
          </Label>

          {signup.error && (
            <span className={style.error}>{signup.error.message}</span>
          )}

          <Button type='submit' variant='turquoise' className={style.button}>
            SIGN UP
          </Button>
        </form>
      </CardContent>

      <CardFooter className={style.footer}>
        <span>
          Already have an account?{' '}
          <Link to='/login'>
            {signup.isPending ? 'Loading...' : 'Login now'}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};
