import { db } from '@/services/firebase';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { PersonalLists } from '../types';

export const toggleMediaInList = async (
  userId: string,
  mediaId: number,
  listTitle: keyof PersonalLists,
  mediaType: 'tv' | 'movie',
  addToHistory?: boolean
) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return;

    const userData = userSnap.data();
    const { id, ...userLists } = userData as PersonalLists & { id: string };
    const savedList = userLists[listTitle][mediaType];
    const updateKey = `${listTitle}.${mediaType}`;

    if (savedList.length === 50) return;

    if (listTitle === 'recent') {
      if (addToHistory) {
        await updateDoc(userRef, {
          [updateKey]: arrayRemove(mediaId),
        });
        await updateDoc(userRef, {
          [updateKey]: arrayUnion(mediaId),
        });
        return 'added';
      } else {
        await updateDoc(userRef, {
          [updateKey]: arrayRemove(mediaId),
        });
        return 'removed';
      }
    }

    if (savedList.includes(mediaId)) {
      await updateDoc(userRef, {
        [updateKey]: arrayRemove(mediaId),
      });
      return 'removed';
    } else {
      await updateDoc(userRef, {
        [updateKey]: arrayUnion(mediaId),
      });
      return 'added';
    }
  } catch (err) {
    throw err;
  }
};
