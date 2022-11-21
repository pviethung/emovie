import { auth } from '@/services/firebase';
import { updatePassword as authUpdatePassword } from 'firebase/auth';

export const updatePassword = (newPassword: string) => {
  if (!auth.currentUser) throw Error('User not found!');

  try {
    return authUpdatePassword(auth.currentUser, newPassword);
  } catch (err) {
    throw err;
  }
};
