import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDTJdARvUwan8TwqrqMSkdnnxPlSO1IZmc",
  authDomain: "fb-crud-ec748.firebaseapp.com",
  databaseURL: "https://fb-crud-ec748-default-rtdb.firebaseio.com",
  projectId: "fb-crud-ec748",
  storageBucket: "fb-crud-ec748.appspot.com",
  messagingSenderId: "1055970554063",
  appId: "1:1055970554063:web:f3b8e555814933fcdcc7ba"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
