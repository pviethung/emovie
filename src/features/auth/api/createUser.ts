import { auth } from '@/services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../authSlice';

type UserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const createUser = async (data: UserData) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const { email, emailVerified, photoURL, uid } = response.user;

  await updateProfile(response.user, {
    displayName: data.firstName,
  });

  return {
    displayName: data.firstName,
    email,
    emailVerified,
    photoURL,
    uid,
  } as User;
};
