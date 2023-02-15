import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAKyGdu_46lwlGoswkxS3sISQZFRxL8PNM',
	authDomain: 'ecom-typescript-phamminhtan.firebaseapp.com',
	projectId: 'ecom-typescript-phamminhtan',
	storageBucket: 'ecom-typescript-phamminhtan.appspot.com',
	messagingSenderId: '967904015533',
	appId: '1:967904015533:web:5d1298085ebc2d6f32c224',
	measurementId: 'G-XM4ZBNRXTR',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
