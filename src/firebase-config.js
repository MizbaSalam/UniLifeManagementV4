// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqpge4uE19XhcFqzWDC7hDAEt8z_OT51E",
  authDomain: "v2unilifemanagement.firebaseapp.com",
  projectId: "v2unilifemanagement",
  storageBucket: "v2unilifemanagement.appspot.com",
  messagingSenderId: "533169747444",
  appId: "1:533169747444:web:20540ace2021de34a4b5a1",
  measurementId: "G-VPN653539S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {  app, auth };
