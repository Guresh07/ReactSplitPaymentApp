// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBsdN7oyGC7sjthP_0JaA7VuPti1fl3Ks",
  authDomain: "splitpaymentapp-5f5cb.firebaseapp.com",
  projectId: "splitpaymentapp-5f5cb",
  storageBucket: "splitpaymentapp-5f5cb.firebasestorage.app",
  messagingSenderId: "355762014920",
  appId: "1:355762014920:web:6dd238d4b39fddeee573fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);