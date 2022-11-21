import { auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from '../authSlice';

export const getUser = () => {
  return new Promise<User | null>((rs, rj) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        return rs({
          displayName: user.displayName as string,
          email: user.email as string,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid,
        } as User);
      } else {
        return rj(null);
      }
    });
    unsubscribe();
  });
};
