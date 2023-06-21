import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAF4plcryboGAmo0tBQEG9gHMv1oNLsR90",
  authDomain: "fir-react-66236.firebaseapp.com",
  projectId: "fir-react-66236",
  storageBucket: "fir-react-66236.appspot.com",
  messagingSenderId: "618776726443",
  appId: "1:618776726443:web:85a000851eb4fb0acfa0ee",
  measurementId: "G-HKE66F4FYE",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
