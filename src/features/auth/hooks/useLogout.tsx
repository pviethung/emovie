import { useMutation } from '@tanstack/react-query';
import { logout } from '../api/logout';

export const useLogout = () => {
  const res = useMutation(logout);

  return {
    logout: res.mutate,
    ...res,
  };
};
