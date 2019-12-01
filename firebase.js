import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDSvoEAFiLUBGgzoUZDQ8v8GG89oT_D8YU",
  authDomain: "fido-662bc.firebaseapp.com",
  databaseURL: "https://fido-662bc.firebaseio.com",
  projectId: "fido-662bc",
  storageBucket: "fido-662bc.appspot.com",
  messagingSenderId: "379584887000",
  appId: "1:379584887000:web:d37c5c5f110dff9272bfad",
  measurementId: "G-2RN69VWZY4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

export default firestore;
