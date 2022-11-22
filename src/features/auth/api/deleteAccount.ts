import { auth } from '@/services/firebase';
import { deleteUser } from 'firebase/auth';

export const deleteAccount = () => {
  if (!auth.currentUser) throw Error('User not found!');

  try {
    return deleteUser(auth.currentUser);
  } catch (err) {
    throw err;
  }
};
