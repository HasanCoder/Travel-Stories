// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNtLtPO5FOoWE9E35DC_qM5j2twynsKHw",
  authDomain: "travel-stories-74648.firebaseapp.com",
  databaseURL:
    "https://travel-stories-74648-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "travel-stories-74648",
  storageBucket: "travel-stories-74648.appspot.com",
  messagingSenderId: "1090284821294",
  appId: "1:1090284821294:web:68660189c13d010ff738bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
