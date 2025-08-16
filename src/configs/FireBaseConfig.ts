// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, collection} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQSTMad392x5PZpGkQT0eZ2vY9EbWHWA4",
    authDomain: "gallery-a316b.firebaseapp.com",
    projectId: "gallery-a316b",
    storageBucket: "gallery-a316b.firebasestorage.app",
    messagingSenderId: "258963259077",
    appId: "1:258963259077:web:b1531d2660c7e40108faac",
    measurementId: "G-E2GZ1DHMXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }