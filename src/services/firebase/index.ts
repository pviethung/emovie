import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC_nqcT15cTyPWALOru-7vuYn3KywGR-Hs',
  authDomain: 'emovie-6f548.firebaseapp.com',
  projectId: 'emovie-6f548',
  storageBucket: 'emovie-6f548.appspot.com',
  messagingSenderId: '349018351708',
  appId: '1:349018351708:web:83bb1034321943cde15e99',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
