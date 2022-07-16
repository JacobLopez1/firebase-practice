// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIhVnOpEwkiL2EKiCu2J7q8u6s0vXWsPk",
  authDomain: "fir-practice-76fb7.firebaseapp.com",
  projectId: "fir-practice-76fb7",
  storageBucket: "fir-practice-76fb7.appspot.com",
  messagingSenderId: "919995395638",
  appId: "1:919995395638:web:ef03a0ff747a6a2127f297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();