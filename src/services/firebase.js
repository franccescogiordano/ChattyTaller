import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyB_NAl0_xFoLAHZtAe2Dpj1_K1J0yC-1Zs",

  authDomain: "chatty-a7acc.firebaseapp.com",

  projectId: "chatty-a7acc",

  storageBucket: "chatty-a7acc.appspot.com",

  messagingSenderId: "399847955933",

  appId: "1:399847955933:web:867274078d09105c042a34",

  measurementId: "G-QXY6M4J2NL"

};


// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); 
const db = getDatabase(app);
 const auth = getAuth();
 export { app, auth, db };