import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
	apiKey: 'AIzaSyAcvjpcf0Ipjdb_xL_ZuOtLIoPwYLXp37c',
	authDomain: 'fullstack-8f9b0.firebaseapp.com',
	projectId: 'fullstack-8f9b0',
	storageBucket: 'fullstack-8f9b0.appspot.com',
	messagingSenderId: '295890992573',
	appId: '1:295890992573:web:c022ac0d72546687ba26d4',
	measurementId: 'G-NDH6MBJ4L0',
};

const firebaseApp: any = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
