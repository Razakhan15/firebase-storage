import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8cslIwsJVxIQ3eNOdHslc75HNgqkKi44",
  authDomain: "storeage-72361.firebaseapp.com",
  projectId: "storeage-72361",
  storageBucket: "storeage-72361.appspot.com",
  messagingSenderId: "587434806606",
  appId: "1:587434806606:web:ccaac0e5f3861e55dbe21f",
  measurementId: "G-FKRPHKDYQG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebaseApp  .firestore();
export { db, storage };
