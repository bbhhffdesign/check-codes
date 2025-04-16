import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCiDPHZEXAHbxXM5pBHVPsFsV3oh-BkNRI",
    authDomain: "shaffers-b329f.firebaseapp.com",
    projectId: "shaffers-b329f",
    storageBucket: "shaffers-b329f.firebasestorage.app",
    messagingSenderId: "513809891195",
    appId: "1:513809891195:web:9c15bd18f9f837b210c7de"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };