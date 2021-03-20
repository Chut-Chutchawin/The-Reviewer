import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn-neXJ1jDy7gCWx9FtU-1HG3o0UKFb34",
  authDomain: "the-reviewer-2ddf3.firebaseapp.com",
  projectId: "the-reviewer-2ddf3",
  storageBucket: "the-reviewer-2ddf3.appspot.com",
  messagingSenderId: "82543411908",
  appId: "1:82543411908:web:01263250ede3a9da16ff91",
  measurementId: "G-CL2X50F60N",
};

firebase.initializeApp(firebaseConfig);

export default firebase;