import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0yIiVJQrZFvlriEaSBKLBcpVPh81H0TE",
  authDomain: "antisocialnetwork-40de4.firebaseapp.com",
  projectId: "antisocialnetwork-40de4",
  storageBucket: "antisocialnetwork-40de4.firebasestorage.app",
  messagingSenderId: "601093154271",
  appId: "1:601093154271:web:3cd639066a26ecdef8506a",
  measurementId: "G-XVGH7R5GG5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;