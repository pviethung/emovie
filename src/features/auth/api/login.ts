import { PersonalLists } from '@/features/lists';
import { auth, db } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../authSlice';

type UserData = {
  email: string;
  password: string;
};

export const Login = async (data: UserData) => {
  const response = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const { displayName, email, emailVerified, photoURL, uid } = response.user;
  // let userLists: TLists | null = null;
  let userLists: PersonalLists | null = null;

  // check user exist
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // const bookmarkedId = getRandomId();
    // const recentId = getRandomId();
    // const likedId = getRandomId();

    // const defaultUserLists = {
    //   id: uid,
    //   bookmarked: {
    //     listId: bookmarkedId,
    //     title: 'Bookmarked',
    //   },
    //   recent: {
    //     listId: recentId,
    //     title: 'Recent',
    //   },
    //   liked: {
    //     listId: likedId,
    //     title: 'Liked',
    //   },
    // } as TLists;

    userLists = {
      bookmarked: {
        tv: [],
        movie: [],
      },
      favorites: {
        tv: [],
        movie: [],
      },
      recent: {
        tv: [],
        movie: [],
      },
    };

    // await setDoc(doc(db, 'users', uid), defaultUserLists);
    await setDoc(doc(db, 'users', uid), { ...userLists, id: uid });
    // userLists = defaultUserLists;
  } else {
    // const { uid: userId, ...rest } = userSnap.data() as TLists & {
    //   uid: string;
    // };
    const { id: userId, ...rest } = userSnap.data();
    userLists = rest as PersonalLists;
  }

  // store.dispatch(getInitialLists(userLists));
  // if (userLists) store.dispatch(getInitialLists(userLists));

  return {
    displayName,
    email,
    emailVerified,
    photoURL,
    uid,
  } as User;
};
