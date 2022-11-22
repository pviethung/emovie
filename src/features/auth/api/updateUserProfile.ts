import { auth } from '@/services/firebase';
import { updateEmail, updateProfile } from 'firebase/auth';
import { getDownloadURL } from 'firebase/storage';
import { updateAvatar } from './updateAvatar';

//TODO subscribe user, currently sync by persist store

export const updateUserProfile = async ({
  displayName,
  email,
  avatar,
}: {
  displayName?: string;
  email?: string;
  avatar?: File;
}) => {
  if (!auth.currentUser) throw Error('User not found!');
  let photoURL: undefined | string = undefined;

  try {
    if (avatar) {
      const { ref } = await updateAvatar(avatar);
      photoURL = await getDownloadURL(ref);
    }

    return await Promise.all([
      updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      }),
      email ? updateEmail(auth.currentUser, email) : undefined,
    ]);
  } catch (err) {
    throw err;
  }
};
