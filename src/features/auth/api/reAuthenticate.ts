import { auth } from '@/services/firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export const reAuthenticate = async (password: string) => {
  if (!auth?.currentUser?.email) return;

  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );
  return await reauthenticateWithCredential(auth.currentUser, credential);
};
