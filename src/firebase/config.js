import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-fgmf0m6uBGo708Ip0qLEUDNEe_bg5DM",
  authDomain: "react-native-d6aa2.firebaseapp.com",
  projectId: "react-native-d6aa2",
  storageBucket: "react-native-d6aa2.appspot.com",
  messagingSenderId: "1072919331263",
  appId: "1:1072919331263:web:0e13fa61ab5fadf182610a",
  measurementId: "G-K88CS1F01Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
