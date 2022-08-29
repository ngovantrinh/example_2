import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBJt3VnggdQC0IHuuGD97iILhyBngU1Q-w',
  authDomain: 'upfileprj.firebaseapp.com',
  projectId: 'upfileprj',
  storageBucket: 'upfileprj.appspot.com',
  messagingSenderId: '107382078247',
  appId: '1:107382078247:web:c64492850fe8a6b3b2c702',
  measurementId: 'G-53D7JD9HM2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
