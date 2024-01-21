// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSvefIFIYAFnzp_90rsGL8OnzpbdPGhdo",
  authDomain: "eduforum-95bce.firebaseapp.com",
  projectId: "eduforum-95bce",
  storageBucket: "eduforum-95bce.appspot.com",
  messagingSenderId: "455998725636",
  appId: "1:455998725636:web:95249dedc7f02c9f3ddf51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
