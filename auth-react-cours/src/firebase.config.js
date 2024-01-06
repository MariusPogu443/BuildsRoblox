
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.React_APP_FIREBASE,
  authDomain: "react-auth-10601.firebaseapp.com",
  projectId: "react-auth-10601",
  storageBucket: "react-auth-10601.appspot.com",
  messagingSenderId: "310257603639",
  appId: "1:310257603639:web:ca12da43394b4f7b491bb2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);