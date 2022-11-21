import { useMutation } from '@tanstack/react-query';
import { createUser } from '../api/createUser';

export const useRegister = () => {
  const res = useMutation({
    mutationFn: createUser,
  });

  return {
    register: res.mutate,
    ...res,
  };
};
