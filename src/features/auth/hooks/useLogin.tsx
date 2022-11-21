import { useMutation } from '@tanstack/react-query';
import { Login } from '../api/login';

export const useLogin = () => {
  const res = useMutation(Login);

  return {
    login: res.mutate,
    ...res,
  };
};
