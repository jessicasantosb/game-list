import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { usersService } from '../../services/api/users';
import { useUser } from '../useUser';

export const useSignUp = () => {
  const signin = useSignIn();

  return useMutation({
    mutationFn: usersService.signup,
    onSuccess: (_data, { email, password }) => {
      signin.mutate({ email, password });
    },
  });
};

export const useSignIn = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: usersService.signin,
    onSuccess: (accessToken) => {
      localStorage.setItem('loggedin', JSON.stringify(accessToken));

      const { full_name } = jwtDecode<{ full_name: string }>(accessToken);
      setUser({ full_name });

      navigate('/');
    },
  });
};
