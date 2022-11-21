import { auth } from '@/services/firebase';
import { signOut } from 'firebase/auth';

export const logout = () => {
  try {
    return signOut(auth);
  } catch (err) {
    throw err;
  }
};
