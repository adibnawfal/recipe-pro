import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPhT6iW5_yuZtW52t3axgey6_EitLaIr0",
  authDomain: "recipepro-5193c.firebaseapp.com",
  projectId: "recipepro-5193c",
  storageBucket: "recipepro-5193c.appspot.com",
  messagingSenderId: "542320237908",
  appId: "1:542320237908:web:ed200abe2253e0ee323cc1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
