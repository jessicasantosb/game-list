import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { usersService } from '../../services/api/users';

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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: usersService.signin,
    onSuccess: (accessToken) => {
      localStorage.setItem('loggedin', JSON.stringify(accessToken));

      const { full_name } = jwtDecode<{ full_name: string }>(accessToken);
      localStorage.setItem('full_name', full_name);
      navigate('/');
    },
  });
};
