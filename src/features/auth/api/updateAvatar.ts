import { auth, storage } from '@/services/firebase';
import { ref, uploadBytes } from 'firebase/storage';

export const updateAvatar = async (file: File) => {
  if (!auth.currentUser) throw Error('User not found!');

  const avatarRef = ref(
    storage,
    `avatar-images/${auth.currentUser.uid}/avatar.jpg`
  );
  try {
    const res = await uploadBytes(avatarRef, file);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
