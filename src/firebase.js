import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAg6rv0ncQ2DUEmL_s29SJhnaOW9MNXiMs',
  authDomain: 'facebook-messenger-clone-cca9d.firebaseapp.com',
  databaseURL: 'https://facebook-messenger-clone-cca9d.firebaseio.com',
  projectId: 'facebook-messenger-clone-cca9d',
  storageBucket: 'facebook-messenger-clone-cca9d.appspot.com',
  messagingSenderId: '226782836798',
  appId: '1:226782836798:web:676aa4131513e5ecbd796f',
  measurementId: 'G-DMH9RVYE1R',
});

const db = firebaseApp.firestore();

export default db;
