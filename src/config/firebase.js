import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Use your own configs!
const app = firebase.initializeApp({
  apiKey: 'AIzaSyCIWeJdjo6MrHeoKFtsmJPqGvZAD7k3Gok',
  authDomain: 'auctions-ae6be.firebaseapp.com',
  projectId: 'auctions-ae6be',
  storageBucket: 'auctions-ae6be.appspot.com',
  messagingSenderId: '981182870360',
  appId: '1:981182870360:web:7b9f4415bc5258cf07eb2d',
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();
