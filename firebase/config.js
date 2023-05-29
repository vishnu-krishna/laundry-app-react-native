import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyANM1MsS6XmoF-NCyigRb5FBd9lMDm1wrw',
    authDomain: 'laundry-app-react-native.firebaseapp.com',
    projectId: 'laundry-app-react-native',
    storageBucket: 'laundry-app-react-native.appspot.com',
    messagingSenderId: '806255658350',
    appId: '1:806255658350:web:529bb388cae3a954edad7f',
};
// init firebase
initializeApp(firebaseConfig);

// init firestore

const db = getFirestore();
// init auth
const auth = getAuth();

export { db, auth, serverTimestamp };
