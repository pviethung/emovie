import { db } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { PersonalLists } from '../types';

export const getList = async (
  mediaType: 'tv' | 'movie',
  userId: string,
  listTitle: keyof PersonalLists
) => {
  // TODO query db too much
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return [];

  const userData = userSnap.data();
  const { id, ...userLists } = userData as PersonalLists & { id: string };
  const savedList = userLists[listTitle][mediaType];

  return savedList;
};
