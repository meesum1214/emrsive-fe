import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBedQ2ibwfpWOAP7wgKzkKQyft8AG7hgLg",
  authDomain: "emrsive-app-109bc.firebaseapp.com",
  projectId: "emrsive-app-109bc",
  storageBucket: "emrsive-app-109bc.appspot.com",
  messagingSenderId: "101884541930",
  appId: "1:101884541930:web:2b9c65713d5ca48232d093"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);